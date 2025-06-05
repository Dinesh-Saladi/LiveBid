import { motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

function BarLoader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="size-3.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
      <div className="size-3.5 animate-bounce rounded-full bg-current [animation-delay:-0.13s]"></div>
      <div className="size-3.5 animate-bounce rounded-full bg-current"></div>
    </div>
  );
}

export default BarLoader;
