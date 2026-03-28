import { motion } from "framer-motion";

function AutosRepairs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mb-40 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Expert Care for the Road Ahead
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          From routine maintenance to complex engine repairs, our certified
          technicians ensure your vehicle performs at its peak. We combine
          state-of-the-art diagnostics with years of experience to get you back
          on the road safely and swiftly. Trust us with your car; we treat every
          vehicle as if it were our own.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-3 bg-blue-100 rounded-2xl blur-2xl opacity-60"></div>
        <img
          src="https://dummyimage.com/600x450/e5e7eb/000000&text=Automotive+Workshop"
          alt="Bengkel Automotive"
          className="relative rounded-2xl shadow-lg"
        />
      </div>
    </motion.section>
  );
}

export default AutosRepairs;
