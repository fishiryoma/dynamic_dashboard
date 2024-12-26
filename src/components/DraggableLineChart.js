import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomLineChart = () => {
    const data = [
        { name: "Jan", value: 30 },
        { name: "Feb", value: 50 },
        { name: "Mar", value: 45 },
        { name: "Apr", value: 70 },
        { name: "May", value: 60 },
        { name: "Jun", value: 80 },
        { name: "Jul", value: 75 },
        { name: "Aug", value: 90 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            {/* <div
                style={{
                    width: "100%",
                    height: 300,
                    padding: "20px",
                    background: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h3
                    style={{
                        textAlign: "center",
                        fontFamily: "Arial, sans-serif",
                        marginBottom: "10px",
                        color: "#333",
                    }}
                >
                    Monthly Data Trends
                </h3> */}
            <LineChart data={data}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fontWeight: "bold" }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                    }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4CAF50"
                    strokeWidth={3}
                    dot={{
                        r: 5,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                        fill: "#4CAF50",
                    }}
                    activeDot={{ r: 8, stroke: "#4CAF50", strokeWidth: 2 }}
                />
            </LineChart>
            {/* </div> */}
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
