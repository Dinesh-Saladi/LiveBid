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

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("create-auction", (name, category) => {
    const newId = nanoid();
    console.log(`New Auction Created with id: ${newId}`);
    console.log(`Name: ${name} Category: ${category}`);
    auctionDetails.push({id:newId, name: name, category: category});
    io.emit("auction-created", newId);
  });

  socket.on("join-auction", (auctionId) => {
    const match = auctionDetails.find(auction => auction.id === auctionId);
    if(match){
      socket.join(auctionId);
      io.emit("joined-auction", match);
    }else{
      io.emit("invalid-auctionId");
    }
  })
});

initializeDatabase().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
