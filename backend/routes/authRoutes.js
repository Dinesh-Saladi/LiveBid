import express from "express";
import { logOut, register } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", (err, user, info) => {
    if (err) return next({success: false, err});
    if (!user)
      return res.status(401).json({ success: false, message: info.message || "Login failed" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      // Send user info or success message
      return res.json({ success: true, message: "Login successful", user });
    });
  })
);
router.post("/logout", logOut);
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});
export default router;
