import React from "react";
import { Gavel, Twitter, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t py-12"
    >
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gavel className="w-6 h-6" />
              <span className="font-bold text-xl">
                <Link to="/">LiveBid</Link>
              </span>
            </div>
            <p className="text-muted-foreground">
              Transforming live bidding into smart winning.
            </p>
          </div>
          <div></div>
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: "https://github.com/Dinesh-Saladi" },
                { Icon: Twitter, href: "https://x.com/dinesh_saladi" },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/dinesh-saladi-07a441290/",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/_dinesh_79_/",
                },
              ].map(({ Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LiveBid Inc. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
