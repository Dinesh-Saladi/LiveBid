import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { sql } from "./config/db.js";
import passport from "passport";
import flash from "express-flash";
import authRoutes from "./routes/authRoutes.js";
import initializePassport from "./config/passport.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

initializePassport(passport); // Passport configuration

dotenv.config();
const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(flash());

if (process.env.NODE_ENV === "production") {
  //FOR DEPLOYMENT SESSION
  app.set("trust proxy", 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        secure: true, // Required for HTTPS
        sameSite: "None", // Required for cross-origin
        httpOnly: true, // Optional, for security
        domain: process.env.BACKEND_DOMAIN, // Optional, for cross-origin
      },
    })
  );
} else {
  // FOR LOCAL SESSION
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
      },
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

async function initializeDatabase() {
  try {
    const result = await sql`select version()`;
    console.log("Database version:", result);
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database: " + error);
  }
}

let auctionDetails = [];

let items = [
  {
    name: "Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Description:
      "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
    seller: "Dinesh",
    email: "dineshsaladi79@gmail.com",
  },
  {
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1592919933511-ea9d487c85e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Description:
      "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
    seller: "Ghost",
    email: "ghost@gmail.com",
  },
  {
    name: "CC TV",
    image:
      "https://images.unsplash.com/photo-1617897711385-df9c86b7dfe3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Description:
      "Responsive keys for fast, accurate typing\nSleek, durable design\nCustomizable RGB backlighting\nPlug & play with USB or Bluetooth connectivity",
    seller: "Milan",
    email: "milan@gmail.com",
  },
];

function incBid(curr_bid) {
  if (curr_bid < 100) {
    return curr_bid + 20;
  } else if (curr_bid < 500) {
    return curr_bid + 50;
  } else if (curr_bid < 1000) {
    return curr_bid + 100;
  } else if (curr_bid < 2000) {
    return curr_bid + 200;
  } else if (curr_bid < 10000) {
    return curr_bid + 500;
  } else if (curr_bid < 100000) {
    return curr_bid + 1000;
  } else if (curr_bid < 500000) {
    return curr_bid + 5000;
  } else if (curr_bid < 1000000) {
    return curr_bid + 10000;
  } else if (curr_bid < 5000000) {
    return curr_bid + 50000;
  } else {
    return curr_bid + 100000;
  }
}

const onGoingAuctions = new Map();

setInterval(async () => {
  for (const [key, value] of onGoingAuctions) {
    value["curr_time"] -= 1;
    console.log(value["curr_time"]);
    if (value["curr_time"] == 0) {
      io.to(key).emit("current", value);
      io.to(key).emit("time-up", value);
      try {
        //activity seller
        const activity_item = value["curr_item"];
        const activity_bid = value["bid"];
        if (activity_bid.price) {
          let status = "Sold";
          const res1 = await sql`
          INSERT INTO activity (item_name, item_description, user_id, status, price)
          VALUES (${activity_item.item_name}, ${activity_item.item_description}, ${activity_item.user_id}, ${status}, ${activity_bid.price});
          `;
          status = "Bought";
          const res2 = await sql`
          INSERT INTO activity (item_name, item_description, user_id, status, price)
          VALUES (${activity_item.item_name}, ${activity_item.item_description}, ${activity_bid.id}, ${status}, ${activity_bid.price});
          `;
          const res3 = await sql`
          INSERT INTO summary (auction_id, item_name, seller, buyer, price, status)
          VALUES (${key}, ${activity_item.item_name},${activity_item.name},${activity_bid.name}, ${activity_bid.price}, ${status});
          `;
        } else {
          const status = "UnSold";
          const res1 = await sql`
          INSERT INTO activity (item_name, item_description, user_id, status, price)
          VALUES (${activity_item.item_name}, ${activity_item.item_description}, ${activity_item.user_id}, ${status}, ${activity_bid.price});
          `;
          const res3 = await sql`
          INSERT INTO summary (auction_id, item_name, seller, buyer, price, status)
          VALUES (${key}, ${activity_item.item_name},${activity_item.name},${activity_bid.name}, ${activity_bid.price}, ${status});
          `;
        }
      } catch (e) {
        console.log(e);
      }
      if (value["queue"].length > 0) {
        value["curr_item"] = value["queue"][0];
        value["bid"] = {
          name: null,
          email: null,
          price: null,
        };
        value["queue"].shift();
        value["curr_time"] = 120;
        io.to(key).emit("current", value);
        onGoingAuctions.set(key, value);
      } else {
        const status = "ended";
        try {
          const res = await sql`
          UPDATE auctions
          SET status = ${status}
          WHERE id = ${key}
          `;
        } catch (e) {
          console.log(e);
        }
        io.to(key).emit("current-status", "ended");
        onGoingAuctions.delete(key);
      }
    } else {
      if (value["curr_time"] >= 0) {
        io.to(key).emit("current", value);
        onGoingAuctions.set(key, value);
      }
    }
  }
}, 1000);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("create-auction", async (name, category, user_id) => {
    const newId = nanoid();
    console.log(`New Auction Created with id: ${newId}`);
    console.log(`Name: ${name} Category: ${category}`);
    auctionDetails.push({
      id: newId,
      name: name,
      category: category,
      user_id: user_id,
    });
    const status = "upComing";
    const result = await sql`
      INSERT INTO auctions (user_id, auction_name, auction_category, status)
      VALUES (${user_id}, ${name}, ${category}, ${status})
      RETURNING *
    `;
    console.log(result);
    io.emit("auction-created", newId);
  });

  socket.on("is-there-auction", async (auctionId) => {
    // const match = auctionDetails.find((auction) => auction.id === auctionId);
    const match = await sql`SELECT id FROM auctions WHERE id = ${auctionId}`;
    if (match.length) {
      console.log("yes its there from backend");
      socket.emit("yes-it-is-there");
    } else {
      console.log("no not there");
      socket.emit("no-its-not");
    }
  });

  socket.on("join-auction", async (auctionId) => {
    // const match = auctionDetails.find((auction) => auction.id === auctionId);
    const match = await sql`SELECT * FROM auctions WHERE id = ${auctionId}`;
    if (match.length) {
      socket.join(auctionId);
      console.log(socket.id);
      socket.emit("joined-auction", match[0]);
      io.to(auctionId).emit("current-status", match[0].status);
    } else {
      socket.emit("invalid-auctionId");
    }
  });

  socket.on("current-item", (auctionId) => {
    socket.emit(onGoingAuctions.get(auctionId)["curr_item"]);
  });

  socket.on("start-auction", async (auctionId) => {
    try {
      const value = {};
      const res = await sql`
      SELECT * 
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE auction_id = ${auctionId}
      `;
      if (res.length) {
        console.log(res);
        value["queue"] = res;
        value["curr_item"] = res[0];
        value["bid"] = {
          id: null,
          name: null,
          email: null,
          price: null,
        };
        value["curr_time"] = 120;
        value["queue"].shift();
        console.log(value);
        // items.shift();
        const status = "onGoing";
        try {
          const res = await sql`
          UPDATE auctions
          SET status = ${status}
          WHERE id = ${auctionId}
          `;
        } catch (e) {
          console.log(e);
        }
        io.to(auctionId).emit("current-status", "onGoing");
        io.to(auctionId).emit("current", value);
        onGoingAuctions.set(auctionId, value);
      } else {
        socket.emit("cannot-start");
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on(
    "add-item",
    async (name, description, userId, auctionId, basePrice, imageUrl) => {
      console.log("adding item.....");
      try {
        const res = await sql`
        INSERT INTO items (item_name, item_description, user_id, auction_id, base_price, image_url)
        VALUES (${name}, ${description}, ${userId}, ${auctionId}, ${basePrice}, ${imageUrl})
      `;
        console.log("added...");
        socket.emit("added");
        const items =
          await sql`SELECT * FROM items WHERE auction_id = ${auctionId}`;
        io.emit("new-items", items);
        console.log("sent");
        console.log("Emitted new-items to room", auctionId, "with", items);
      } catch (e) {
        console.log("not added");
        console.log(e);
        socket.emit("not-added", e);
      }
    }
  );

  socket.on("get-items", async (auctionId) => {
    try {
      console.log("getting items...");
      const res =
        await sql`SELECT * FROM items WHERE auction_id = ${auctionId}`;
      console.log(res);
      socket.emit("here-take-items", res);
      console.log("items sent");
    } catch (e) {
      socket.emit("error-getting-items", e);
    }
  });

  socket.on("get-rooms", () => {
    console.log("Rooms for", socket.id, ":", Array.from(socket.rooms));
  });

  socket.on("place-bid", (auctionId, user) => {
    let value = onGoingAuctions.get(auctionId);
    if (value["bid"].id) {
      value["bid"].price = incBid(value["bid"].price);
    } else {
      value["bid"].price = value["curr_item"].base_price;
    }
    value["bid"].id = user.id;
    value["bid"].name = user.name;
    value["bid"].email = user.email;
    value["curr_time"] = 120;
    onGoingAuctions.set(auctionId, value);
    io.to(auctionId).emit("current", value);
    console.log(value);
  });

  socket.on("get-summary", async (auctionId) => {
    try {
      const res = await sql`
      SELECT * FROM summary WHERE auction_id = ${auctionId}
      `;
      console.log(res);
      socket.emit("take-summary", res);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("get-details", async (user_id) => {
    try {
      let status = "onGoing";
      const res1 = await sql`SELECT * FROM auctions WHERE status = ${status}`;
      status = "upComing";
      const res2 = await sql`SELECT * FROM auctions WHERE status = ${status}`;
      const res3 = await sql`SELECT * FROM items`;
      const res4 =
        await sql`SELECT * FROM activity WHERE user_id = ${user_id} ORDER BY id DESC LIMIT 2`;
      console.log("start");
      console.log(res4);
      let details = {
        ongoing: res1.length,
        upcoming: res2.length,
        itemsplaced: res3.length,
        activity: res4,
      };
      console.log("end");
      console.log(details);
      socket.emit("take-details", details);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("give-data-myauctions", async (user_id) => {
    try {
      const data = {
        upcoming: null,
        ongoing: null,
        ended: null,
      };
      let status = "upComing";
      const res1 =
        await sql`SELECT * FROM auctions WHERE user_id = ${user_id} AND status = ${status}`;
      data.upcoming = res1;
      status = "onGoing";
      const res2 =
        await sql`SELECT * FROM auctions WHERE user_id = ${user_id} AND status = ${status}`;
      data.ongoing = res2;
      status = "ended";
      const res3 =
        await sql`SELECT * FROM auctions WHERE user_id = ${user_id} AND status = ${status}`;
      data.ended = res3;
      console.log("data started");
      console.log(data);
      console.log("data ended");
      socket.emit("take-data-myauctions", data);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("give-data-allauctions", async () => {
    try {
      const data = {
        upcoming: null,
        ongoing: null,
        ended: null,
      };
      let status = "upComing";
      const res1 = await sql`SELECT * FROM auctions WHERE status = ${status}`;
      data.upcoming = res1;
      status = "onGoing";
      const res2 = await sql`SELECT * FROM auctions WHERE status = ${status}`;
      data.ongoing = res2;
      status = "ended";
      const res3 = await sql`SELECT * FROM auctions WHERE status = ${status}`;
      data.ended = res3;
      console.log("data started");
      console.log(data);
      console.log("data ended");
      socket.emit("take-data-allauctions", data);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("get-activity-details", async (user_id) => {
    try {
      const res = await sql`SELECT * FROM activity WHERE user_id = ${user_id} ORDER BY id DESC`;
      console.log(res);
      socket.emit("take-activity-details", res);
    } catch (e) {
      console.log(e);
    }
  });
});

initializeDatabase().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
