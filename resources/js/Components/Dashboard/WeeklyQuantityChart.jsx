import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

export default function WeeklyQuantityChart({ chart }) {
    const COLORS = [
        "#3b82f6",
        "#f97316",
        "#22c55e",
        "#eab308",
        "#a855f7",
        "#ef4444",
    ];
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart.data}>
                    <XAxis dataKey="week_code" />

                    <YAxis />

                    <Tooltip />

                    {chart.series.map((seriesName, index) => (
                        <Bar
                            key={seriesName}
                            dataKey={seriesName}
                            fill={COLORS[index % COLORS.length]}
                            radius={[6, 6, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
