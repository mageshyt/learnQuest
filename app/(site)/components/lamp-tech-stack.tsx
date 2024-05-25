import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

const LampTechStack = () => {
  return (
    <section className="mt-[-300px]">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Our Tech Stack
          <br /> Used in the Project
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 text-center text-xl md:text-2xl text-slate-600"
        >
         
        </motion.p>
      </LampContainer>
    </section>
  );
};

export default LampTechStack;
