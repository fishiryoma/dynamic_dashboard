import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { name: "類別A", value: 400 },
    { name: "類別B", value: 300 },
    { name: "類別C", value: 300 },
    { name: "類別D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// 計算百分比的函數
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
                <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
                <p className="text-sm text-gray-600">{`(${(
                    (payload[0].value / 1200) *
                    100
                ).toFixed(1)}%)`}</p>
            </div>
        );
    }
    return null;
};
const DraggablePieChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel}
                >
                    {data.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DraggablePieChart;
