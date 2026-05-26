import { Deferred, usePage } from "@inertiajs/react";
import { Skeleton, Typography, Card, FloatButton } from "antd";
import SummaryCard from "../../../Components/Dashboard/SummaryCard";
import WeeklyQuantityChart from "../../../Components/Dashboard/WeeklyQuantityChart";
import {
    FileTextOutlined,
    ThunderboltOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import { Colors } from "../../../Themes/Colors";

const { Title } = Typography;
function Management() {
    const { auth, summaryCards, weeklyQuantityChart } = usePage().props;
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
            <FloatButton.Group
                shape="circle"
                trigger="click"
                type="primary"
                icon={<ThunderboltOutlined />}
            >
                <FloatButton
                    icon={<FileTextOutlined />}
                    tooltip="Create Report"
                    styles={{ backgroundColor: Colors.primary }}
                />

                <FloatButton
                    icon={<WalletOutlined />}
                    tooltip="Submit Payroll"
                />
            </FloatButton.Group>
        </>
    );
}

export default Management;
