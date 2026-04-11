import { motion } from "framer-motion";
import { Colors } from "../../Themes/Colors";

function CareerJoin() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="text-2xl md:text-3xl font-semibold text-center mt-8">
                Let's Grow Together
            </div>
            <div className="text-lg md:text-xl text-center mt-4">
                We believe great work starts with great people.
            </div>
            <div className="flex items-center justify-center">
                <a
                    href="https://discord.gg/uqNxz2Ty4p"
                    target="_blank"
                    style={{ backgroundColor: Colors.primary, color: "white" }}
                    className="mt-4 inline-flex px-5 py-2 text-lg rounded-lg font-semibold"
                >
                    Join Us
                </a>
            </div>
        </motion.section>
    );
}

export default CareerJoin;
