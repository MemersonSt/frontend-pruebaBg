import { motion, AnimatePresence } from "framer-motion";

interface TransitionProps {
  children: React.ReactNode;
//   keyPage: string;
}

export default function Transition({ children }: TransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // key={keyPage}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}