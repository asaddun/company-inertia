import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mb-40 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      id="hero"
    >
      <div>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          The best way to predict the Future is to Create it
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          The Dabellyou Company. We exist with one main goal: to open
          opportunities for medium-sized businesses to grow, thrive, and survive
          in a world that is constantly changing.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-2 bg-blue-100 rounded-2xl blur-2xl opacity-50"></div>
        <img
          src="https://dummyimage.com/600x400/e5e7eb/000000"
          alt="Hero Illustration"
          className="relative rounded-2xl shadow-lg"
        />
      </div>
    </motion.section>
  );
}

export default Hero;
