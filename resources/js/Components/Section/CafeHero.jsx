import { Link } from "@inertiajs/react";
import { Colors } from "../../Themes/Colors";
import { motion } from "framer-motion";

function CafeHero({ isHome }) {
    const titleSize = isHome ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl";
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-7xl mb-40 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            id="cafe"
        >
            <div>
                <span className="inline-block mb-4 text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-1 rounded-full">
                    Restaurant
                </span>

                <h2
                    className={`${titleSize} font-bold text-gray-900 leading-tight`}
                >
                    Kawaii Cafe
                </h2>

                <p className="mt-6 text-lg text-gray-600 max-w-xl">
                    Step into a cozy corner of Japan. Enjoy our artisan matcha
                    and hand-crafted pastries in the company of our friendly
                    feline residents. It's the perfect sanctuary to unwind, sip,
                    and purr.
                </p>

                {isHome && (
                    <Link href="/cafe">
                        <button
                            style={{
                                backgroundColor: Colors.primary,
                                color: "white",
                            }}
                            className="mt-4 inline-flex items-center justify-center px-6 py-3 text-lg rounded-lg font-semibold cursor-pointer"
                        >
                            Learn More
                        </button>
                    </Link>
                )}
            </div>

            <div className="relative">
                <div className="absolute -inset-3 bg-blue-100 rounded-2xl blur-2xl opacity-60"></div>
                <img
                    src="https://dummyimage.com/600x450/e5e7eb/000000&text=Restaurant+Cafe"
                    alt="Restaurant Cafe"
                    className="relative rounded-2xl shadow-lg"
                />
            </div>
        </motion.section>
    );
}

export default CafeHero;
