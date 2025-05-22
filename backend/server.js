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

initializePassport(passport); // Passport configuration

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow cookies to be sent
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(flash());
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

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
