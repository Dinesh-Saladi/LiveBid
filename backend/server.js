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

const onGoingAuctions = new Map();

setInterval(() => {
  for (const [key, value] of onGoingAuctions) {
    value["curr_time"] -= 1;
    console.log(value["curr_time"]);
    if (value["curr_time"] == 0) {
      io.to(key).emit("time-up", value);
      if (items.length > 0) {
        value["curr_item"] = items[0];
        value["curr_time"] = 120;
        items.shift();
        io.to(key).emit("current", value);
        onGoingAuctions.set(key, value);
      } else {
        onGoingAuctions.delete(key);
      }
    } else {
      io.to(key).emit("current", value);
      onGoingAuctions.set(key, value);
    }
  }
}, 1000);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("create-auction", (name, category, user_id) => {
    const newId = nanoid();
    console.log(`New Auction Created with id: ${newId}`);
    console.log(`Name: ${name} Category: ${category}`);
    auctionDetails.push({
      id: newId,
      name: name,
      category: category,
      user_id: user_id,
    });
    io.emit("auction-created", newId);
  });

  socket.on("is-there-auction", (auctionId) => {
    const match = auctionDetails.find((auction) => auction.id === auctionId);
    if (match) {
      console.log("yes its there from backend");
      socket.emit("yes-it-is-there");
    } else {
      console.log("no not there");
      socket.emit("no-its-not");
    }
  });

  socket.on("join-auction", (auctionId) => {
    const match = auctionDetails.find((auction) => auction.id === auctionId);
    if (match) {
      socket.join(auctionId);
      console.log(socket.id);
      socket.emit("joined-auction", match);
    } else {
      socket.emit("invalid-auctionId");
    }
  });

  socket.on("current-item", (auctionId) => {
    socket.emit(onGoingAuctions.get(auctionId)["curr_item"]);
  });

  socket.on("start-auction", (auctionId) => {
    const value = {};
    value["curr_item"] = items[0];
    value["curr_time"] = 120;
    console.log(value);
    items.shift();
    io.to(auctionId).emit("current-status", "onGoing");
    io.to(auctionId).emit("current", value);
    onGoingAuctions.set(auctionId, value);
  });
});

initializeDatabase().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
