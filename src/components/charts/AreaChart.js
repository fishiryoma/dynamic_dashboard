import { COLORS, tooltipBg, tooltipLabel, tooltipText } from "../style";
import {
    AreaChart,
    Area,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function AreaChartComponent() {
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
            <AreaChart
                data={data}
                className="p-3"
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
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
                <Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke={COLORS[0]}
                    fill={COLORS[0]}
                    activeDot={{ r: 7, stroke: COLORS[0], strokeWidth: 2 }}
                />
                <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke={COLORS[1]}
                    fill={COLORS[1]}
                    activeDot={{
                        r: 7,
                        stroke: COLORS[1],
                        strokeWidth: 2,
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="amt"
                    stackId="1"
                    stroke={COLORS[2]}
                    fill={COLORS[2]}
                    activeDot={{ r: 7, stroke: COLORS[2], strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
