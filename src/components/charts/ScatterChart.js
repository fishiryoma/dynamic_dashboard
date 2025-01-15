import { COLORS, tooltipBg, tooltipLabel, tooltipText } from "../style";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data01 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];
const data02 = [
    { x: 300, y: 300, z: 200 },
    { x: 400, y: 500, z: 260 },
    { x: 200, y: 700, z: 400 },
    { x: 340, y: 350, z: 280 },
    { x: 560, y: 500, z: 500 },
    { x: 230, y: 780, z: 200 },
    { x: 500, y: 400, z: 200 },
    { x: 300, y: 500, z: 260 },
    { x: 240, y: 300, z: 400 },
    { x: 320, y: 550, z: 280 },
    { x: 500, y: 400, z: 500 },
    { x: 420, y: 280, z: 200 },
];

export default function ScatterChartComponent() {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={tooltipBg}>
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
            <ScatterChart
                className="p-3"
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ bottom: "15px" }}
                />

                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ strokeDasharray: "3 3" }}
                />
                <XAxis
                    type="number"
                    dataKey="x"
                    name="stature"
                    unit="cm"
                    tick={{ fontSize: 14, fontWeight: "bold" }}
                />
                <YAxis
                    yAxisId="left"
                    type="number"
                    dataKey="y"
                    name="weight"
                    unit="kg"
                    stroke={COLORS[1]}
                    tick={{ fontSize: 14 }}
                />
                <YAxis
                    yAxisId="right"
                    type="number"
                    dataKey="y"
                    name="weight"
                    unit="kg"
                    orientation="right"
                    stroke={COLORS[2]}
                    tick={{ fontSize: 14 }}
                />

                <Scatter
                    yAxisId="left"
                    name="A school"
                    data={data01}
                    fill={COLORS[1]}
                />
                <Scatter
                    yAxisId="right"
                    name="B school"
                    data={data02}
                    fill={COLORS[2]}
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
