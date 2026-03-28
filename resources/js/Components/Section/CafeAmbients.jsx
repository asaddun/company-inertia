import { motion } from "framer-motion";

motion;
function CafeAmbients() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mb-40 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <div className="relative">
        <div className="absolute -inset-3 bg-blue-100 rounded-2xl blur-2xl opacity-60"></div>
        <img
          src="https://dummyimage.com/600x450/e5e7eb/000000&text=Restaurant+Cafe"
          alt="Restaurant Cafe"
          className="relative rounded-2xl shadow-lg"
        />
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Experience the Magic of a Kawaii Escape
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Inspired by the charming cat cafes of Tokyo, we bring you a blend of
          adorable aesthetics and premium Japanese treats. From kitty-shaped
          lattes to cozy paws, every moment here is designed to make you smile.
        </p>
      </div>
    </motion.section>
  );
}

export default CafeAmbients;
