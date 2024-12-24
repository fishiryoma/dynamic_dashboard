import React from 'react';

const Sidebar = ({ setSelectDataOpen }) => {
  return (
    <div className="absolute left-0 top-0 bottom-0 w-[100px] flex items-center">
      <div className="flex flex-col">
        <button
          onClick={() => {
            setSelectDataOpen({ open: true, type: 'pie' })
          }}
          className="w-[100px] h-[100px] bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center justify-center"
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
          圓餅圖
        </button>
        <button
          onClick={() => {
            setSelectDataOpen({ open: true, type: 'bar' })
          }}
          className="w-[100px] h-[100px] bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center justify-center"
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          長條圖
        </button>
        <button
          onClick={() => {
            setSelectDataOpen({ open: true, type: 'line' })
          }}
          className="w-[100px] h-[100px] bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-md transition-colors duration-200 flex flex-col items-center justify-center"
        >
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          折線圖
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
