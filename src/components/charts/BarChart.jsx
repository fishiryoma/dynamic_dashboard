import { COLORS, tooltipBg, tooltipText, tooltipLabel } from "../style";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
    { name: "Page C", uv: 2000, pv: 9800 },
    { name: "Page D", uv: 2780, pv: 3908 },
    { name: "Page E", uv: 1890, pv: 4800 },
    { name: "Page F", uv: 2390, pv: 3800 },
    { name: "Page G", uv: 3490, pv: 4300 },
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

export default function BarChartComponent() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} className="p-3">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: "bold" }}
                />
                <YAxis tick={{ fontSize: 14 }} />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ bottom: "15px" }}
                />

                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#e9ecef" }}
                />
                <Bar
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                    dataKey="uv"
                    fill={COLORS[1]}
                />
                <Bar
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                    dataKey="pv"
                    fill={COLORS[2]}
                    activeBar={{ stroke: COLORS[0], strokeWidth: 2 }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
