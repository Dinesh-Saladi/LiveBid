import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-slate-200 dark:from-indigo-950 dark:to-slate-900
"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative px-4 sm:px-8 lg:px-16 py-24 md:py-32 flex flex-col items-center justify-center text-center space-y-10"
      >
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Where Every Second Counts Live Auctions, Real Wins
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-600 dark:text-slate-400 md:text-xl">
            Join real-time bidding wars and claim your win from anywhere,
            anytime.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link to="/signup">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
