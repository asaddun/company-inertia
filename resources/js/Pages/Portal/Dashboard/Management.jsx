import { Deferred, Link, usePage } from "@inertiajs/react";
import { Skeleton, Typography, Card } from "antd";
import SummaryCard from "../../../Components/Dashboard/SummaryCard";
import WeeklyQuantityChart from "../../../Components/Dashboard/WeeklyQuantityChart";
import {
    DollarOutlined,
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
                    <Link href={route("reports.create")}>
                        <div className="flex items-center gap-2 group">
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Create Report
                            </span>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50 transition-colors">
                                <FileTextOutlined />
                            </button>
                        </div>
                    </Link>

                    <Link href={route("payrolls.index")}>
                        <div className="flex items-center gap-2 group">
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Review Payroll
                            </span>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50 transition-colors">
                                <DollarOutlined />
                            </button>
                        </div>
                    </Link>
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
