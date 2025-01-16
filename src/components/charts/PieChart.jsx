import { COLORS, tooltipBg, tooltipLabel, tooltipText } from "../style";
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

export default function PieChartComponent() {
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
                <div className={tooltipBg}>
                    <p
                        className={tooltipLabel}
                    >{`${payload[0].name}: ${payload[0].value}`}</p>
                    <p className={tooltipText}>{`(${(
                        (payload[0].value / 1200) *
                        100
                    ).toFixed(1)}%)`}</p>
                </div>
            );
        }
        return null;
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
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
                <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ bottom: "15px" }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
