import { motion } from "framer-motion";

function AutosUpgrades() {
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
          src="https://dummyimage.com/600x450/e5e7eb/000000&text=Automotive+Workshop"
          alt="Bengkel Automotive"
          className="relative rounded-2xl shadow-lg"
        />
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Redefine the Limits of Performance
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Why settle for factory standards? From precision engine tuning to
          bespoke suspension setups, we transform ordinary vehicles into
          extraordinary machines engineered for the track and the street.
        </p>
      </div>
    </motion.section>
  );
}

export default AutosUpgrades;
