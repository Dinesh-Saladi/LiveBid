import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Correct import

function NavBar() {
  return (
    <motion.header
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="shadow-md sticky top-0 z-50 w-full border-b flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-4 container flex h-16 items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center space-x-2"
        >
          <Gavel className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">
            <Link to="/">LiveBid</Link>
          </span>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/login">
              <Button variant="outline" className="inline-flex">
                Sign In
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="hidden sm:inline-flex"
          >
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export default NavBar;
