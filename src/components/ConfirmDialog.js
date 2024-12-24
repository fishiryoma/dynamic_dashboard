import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">確認刪除</h2>
        <p className="text-gray-600 mb-6">確定要刪除這個圖表嗎？</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
