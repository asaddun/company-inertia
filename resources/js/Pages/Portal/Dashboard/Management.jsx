import { Deferred, usePage } from "@inertiajs/react";
import { Skeleton, Typography, Card } from "antd";
import SummaryCard from "../../../Components/Dashboard/SummaryCard";
import WeeklyQuantityChart from "../../../Components/Dashboard/WeeklyQuantityChart";

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
        </>
    );
}

export default Management;
