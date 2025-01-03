import React from "react";

const TrashBox = ({ isOverTrash, trashRef }) => {
  return (
    <div
      className="absolute bottom-4 right-4 w-16 h-16 trash-box"
      ref={trashRef}
    >
      <div
        className={`w-full h-full rounded-lg flex items-center justify-center ${
          isOverTrash ? "bg-red-500" : "bg-gray-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8  ${isOverTrash ? "text-white" : "text-gray-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default TrashBox;
