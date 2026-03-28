import { motion } from "framer-motion";

function CarrerHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mb-20 mx-auto items-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-center mb-8">
        Build Your Career With Us
      </div>
      <div className="text-lg md:text-xl text-center mb-8">
        We're always looking for passionate and skilled people to grow with us.
        Explore our open positions and find the role that fits you best.
      </div>
    </motion.section>
  );
}

export default CarrerHero;
