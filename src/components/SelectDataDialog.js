
export default function SelectDataDialog({ isOpen, onClose, onConfirm }) {
    if (!isOpen.open) return null;

    return (
        <div>
            {isOpen.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">自定義表單</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="select1" className="block text-sm font-medium text-gray-700 mb-1">
                                        選擇 1
                                    </label>
                                    <select
                                        id="select1"
                                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                    >
                                        <option>選項 1</option>
                                        <option>選項 2</option>
                                        <option>選項 3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="select2" className="block text-sm font-medium text-gray-700 mb-1">
                                        選擇 2
                                    </label>
                                    <select
                                        id="select2"
                                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                    >
                                        <option>選項 1</option>
                                        <option>選項 2</option>
                                        <option>選項 3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="input1" className="block text-sm font-medium text-gray-700 mb-1">
                                        輸入 1
                                    </label>
                                    <input
                                        type="text"
                                        id="input1"
                                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="input2" className="block text-sm font-medium text-gray-700 mb-1">
                                        輸入 2
                                    </label>
                                    <input
                                        type="text"
                                        id="input2"
                                        className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1"
                                    />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-700 mb-1">選項</span>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="flex items-center">
                                                <input
                                                    id={`checkbox${num}`}
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor={`checkbox${num}`} className="ml-2 block text-sm text-gray-900">
                                                    選項 {num}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                            <button
                                onClick={onConfirm}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                確認
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

