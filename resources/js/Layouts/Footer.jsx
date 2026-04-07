// import { Link } from "react-router-dom";
import { Link } from "@inertiajs/react";
import { Colors } from "../Themes/Colors";
import { DiscordOutlined } from "@ant-design/icons";
// import { Logos } from "../assets";

function Footer() {
    return (
        <footer>
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 600,
                                fontSize: 24,
                                color: Colors.primary,
                            }}
                        >
                            {/* <img
                                src={Logos.main}
                                alt="Dabellyou"
                                style={{
                                    height: 32,
                                    width: 32,
                                    objectFit: "contain",
                                }}
                            /> */}
                            Dabellyou
                        </Link>
                        <p className="mt-3 text-sm text-gray-500">
                            The best way to predict the Future is to Create it.
                        </p>
                    </div>

                    {/* Links Pages */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">
                            Pages
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-black visited:black hover:text-[#ff67a2]"
                                >
                                    <span className="text-gray-800 hover:text-gray-400">
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/carrers"
                                    className="text-black hover:text-[#ff67a2]"
                                >
                                    <span className="text-gray-800 hover:text-gray-400">
                                        Careers
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/autos"
                                    className="text-black hover:text-[#ff67a2]"
                                >
                                    <span className="text-gray-800 hover:text-gray-400">
                                        Autos
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cafe"
                                    className="text-gray-700 hover:text-primary transition-colors"
                                >
                                    <span className="text-gray-800 hover:text-gray-400">
                                        Cafe
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Social */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">
                            Social
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://discord.gg/uqNxz2Ty4p"
                                    target="_blank"
                                    className="text-black visited:black hover:text-[#ff67a2]"
                                >
                                    <span className="text-gray-800 hover:text-gray-400">
                                        <DiscordOutlined /> Discord
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">
                            Contact
                        </h4>
                        <p className="text-sm text-gray-500">
                            Phone: +62 812-3456-7890
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    © 2026 Dabellyou Company. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
