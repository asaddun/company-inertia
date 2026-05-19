import { usePage } from "@inertiajs/react";
import { Typography } from "antd";
import SummaryCard from "../../../Components/Dashboard/SummaryCard";

const { Title } = Typography;
function Management({ summaryCards }) {
    const { auth } = usePage().props;
    return (
        <>
            <Title level={3}>{`Welcome, ${auth.user.name}`}</Title>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                    <SummaryCard
                        link={card.link}
                        title={card.title}
                        value={card.value}
                    />
                ))}
            </div>
        </>
    );
}

export default Management;
