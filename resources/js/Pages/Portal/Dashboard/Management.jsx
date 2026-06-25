import { Deferred, usePage } from "@inertiajs/react";
import { Skeleton, Typography, Card } from "antd";
import SummaryCard from "../../../Components/Dashboard/SummaryCard";
import WeeklyQuantityChart from "../../../Components/Dashboard/WeeklyQuantityChart";
import {
    FileTextOutlined,
    ThunderboltOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import { Colors } from "../../../Themes/Colors";
import { useState } from "react";

const { Title } = Typography;
function Management() {
    const [isOpen, setIsOpen] = useState(false);
    const { auth, summaryCards, weeklyQuantityChart } = usePage().props;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <Title level={3}>{`Welcome, ${auth.user.name}`}</Title>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                    <SummaryCard
                        key={card.title}
                        link={card.link}
                        params={card.params}
                        title={card.title}
                        value={card.value}
                    />
                ))}
            </div>
            <div className="mt-4">
                <Deferred data="weeklyQuantityChart" fallback={<Skeleton />}>
                    <Card title="Weekly Performance">
                        <WeeklyQuantityChart chart={weeklyQuantityChart} />
                    </Card>
                </Deferred>
            </div>

            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
                {/* Container Menu (Muncul ke atas) */}
                <div
                    className={`flex flex-col items-end gap-2 transition-all duration-300 origin-bottom ${
                        isOpen
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-75 translate-y-4 pointer-events-none"
                    }`}
                >
                    {/* Item Menu 1: Share */}
                    <div className="flex items-center gap-2 group">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Bagikan
                        </span>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.308-2.654m-5.308 2.654l5.308 2.654m1.313-3.118a2.25 2.25 0 11-1.888 2.454 2.25 2.25 0 011.888-2.454zM16.5 5.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Item Menu 2: Edit */}
                    <div className="flex items-center gap-2 group">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Edit Dokumen
                        </span>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Tombol Utama (FAB) */}
                <button
                    onClick={toggleMenu}
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 active:scale-95 focus:outline-none ${
                        isOpen
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {/* Efek Rotasi Ikon saat Terbuka */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Management;
