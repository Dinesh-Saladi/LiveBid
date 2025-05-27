import express from "express";
import { logOut, register } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next({ success: false, err });
    if (!user) {
      return res.status(401).json({ success: false, message: info.message || "Login failed" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: "Login successful", user });
    });
  })(req, res, next); // Call the middleware manually with req, res, next
});

router.post("/logout", logOut);
router.get("/me", (req, res) => { 
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false, user: null });
  }
});
export default router;
