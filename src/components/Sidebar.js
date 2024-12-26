import React from "react";

const ChartButton = ({ onClick, svgPaths, label, color, hoverColor }) => (
  <button
    onClick={onClick}
    className={`w-full h-[100px] ${color} ${hoverColor} text-gray-800 rounded-lg shadow-md transition-transform transform hover:scale-110 flex flex-col items-center justify-center`}
  >
    <svg
      className="w-10 h-10 mb-2 text-gray-700"
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
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

function Sidebar({ setSelectDataOpen }) {
  return (
    <div className="w-[200px] bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        選擇新增圖表類型
      </h2>
      <ChartButton
        onClick={() => setSelectDataOpen({ open: true, type: "pie" })}
        svgPaths={[
          "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z",
          "M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
        ]}
        label="圓餅圖"
        color="bg-rose-100"
        hoverColor="hover:bg-rose-200"
      />
      <ChartButton
        onClick={() => setSelectDataOpen({ open: true, type: "bar" })}
        svgPaths={[
          "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        ]}
        label="長條圖"
        color="bg-sky-100"
        hoverColor="hover:bg-sky-200"
      />
      <ChartButton
        onClick={() => setSelectDataOpen({ open: true, type: "line" })}
        svgPaths={[
          "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
        ]}
        label="折線圖"
        color="bg-lime-100"
        hoverColor="hover:bg-lime-200"
      />
    </div>
  );
}

export default Sidebar;
