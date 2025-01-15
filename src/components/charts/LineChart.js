import { COLORS, tooltipBg, tooltipLabel, tooltipText } from "../style";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function LineChartComponent() {
    const data = [
        { name: "Jan", value1: 30, value2: 59 },
        { name: "Feb", value1: 50, value2: 68 },
        { name: "Mar", value1: 45, value2: 39 },
        { name: "Apr", value1: 70, value2: 69 },
        { name: "May", value1: 60, value2: 108 },
        { name: "Jun", value1: 80, value2: 49 },
        { name: "Jul", value1: 75, value2: 50 },
        { name: "Aug", value1: 90, value2: 23 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={tooltipBg}>
                    <p className={tooltipLabel}>{label}</p>
                    <p
                        className={tooltipText}
                    >{`${payload[0].name}: ${payload[0].value}`}</p>
                    <p
                        className={tooltipText}
                    >{`${payload[1].name}: ${payload[1].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} className="p-3">
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ bottom: "15px" }}
                />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: "bold" }}
                />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "#54546c", strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="value1"
                    stroke={COLORS[1]}
                    strokeWidth={3}
                    dot={{
                        r: 5,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                        fill: COLORS[1],
                    }}
                    activeDot={{ r: 7, stroke: COLORS[1], strokeWidth: 2 }}
                />
                <Line
                    type="monotone"
                    dataKey="value2"
                    stroke={COLORS[2]}
                    strokeWidth={3}
                    dot={{
                        r: 5,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                        fill: COLORS[2],
                    }}
                    activeDot={{ r: 8, stroke: COLORS[2], strokeWidth: 2 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
