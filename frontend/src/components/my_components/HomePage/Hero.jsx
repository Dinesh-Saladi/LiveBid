import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pattern from "../../../assets/pattern.svg";

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          src={pattern}
          alt="Pattern"
          className="[mask-image:radial-gradient(50%_50%_at_center,white,transparent)] opacity-90 dark:opacity-40"
        />
      </div>
      <div className="absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative px-4 sm:px-8 lg:px-16 py-24 md:py-32 flex flex-col items-center justify-center text-center space-y-10"
      >
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Where Every Second Counts <br />
            Live Auctions, Real Wins
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
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
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
            >
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
