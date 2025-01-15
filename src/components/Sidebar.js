import React from "react";

const ChartButton = ({ onClick, svgPaths, label, svg }) => (
    <button
        onClick={onClick}
        className="w-full h-[100px] bg-[#60c5ba]  rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-[#cff09e] text-[#004e66] flex flex-col items-center justify-center"
    >
        <svg
            className="w-10 h-10 mb-2  text-[#004e66]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            {svgPaths.map((path, index) => (
                <path
                    key={index}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={path}
                />
            ))}
        </svg>
        <span className="text-sm font-bold">{label}</span>
    </button>
);

function Sidebar({ setSelectDataOpen }) {
    return (
        <div
            id="sidebar"
            className="w-[200px] bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 border border-gray-200"
        >
            <h2 className="text-lg font-semibold text-gray-700 text-center">
                選擇新增圖表類型
            </h2>
            <ChartButton
                onClick={() => setSelectDataOpen({ open: true, type: "pie" })}
                svgPaths={[
                    "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
                    "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
                ]}
                label="圓餅圖"
            />
            <ChartButton
                onClick={() => setSelectDataOpen({ open: true, type: "bar" })}
                svgPaths={[
                    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                ]}
                label="長條圖"
            />
            <ChartButton
                onClick={() => setSelectDataOpen({ open: true, type: "line" })}
                svgPaths={[
                    "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
                ]}
                label="折線圖"
            />
            <ChartButton
                onClick={() => setSelectDataOpen({ open: true, type: "area" })}
                svgPaths={[
                    "M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
                    "M4 16L8 10L12 14L16 6L20 12L20 16L4 16",
                    "M4 16L8 10L12 14L16 6L20 12L20 16L4 16",
                ]}
                label="區域圖"
            />
            <ChartButton
                onClick={() =>
                    setSelectDataOpen({ open: true, type: "scatter" })
                }
                svgPaths={[
                    "M5 5h2v2H5z", // 點1
                    "M10 8h2v2h-2z", // 點2（位於不同位置）
                    "M15 12h2v2h-2z", // 點3（位於不同位置）
                    "M7 15h2v2H7z", // 點4（不同排列）
                    "M13 18h2v2h-2z", // 點5
                ]}
                label="分散圖"
            />
        </div>
    );
}

export default Sidebar;
