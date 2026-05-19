import { Link } from "@inertiajs/react";
import { Card } from "antd";

function SummaryCard({ link, title, value, params }) {
    return (
        <Link href={link ? route(link, params) : "#"}>
            <Card>
                <div className="flex items-center justify-between">
                    <div>
                        <div
                            className="
                                text-gray-500
                                text-sm
                                min-h-10
                            "
                        >
                            {title}
                        </div>

                        <div className="text-2xl font-bold">{value}</div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default SummaryCard;
