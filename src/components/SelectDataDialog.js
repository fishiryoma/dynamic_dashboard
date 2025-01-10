import { useForm } from "react-hook-form";

export default function SelectDataDialog({ isOpen, onClose, onConfirm }) {
    const { register, handleSubmit } = useForm();
    if (!isOpen.open) return null;

    const renderFields = () => {
        switch (isOpen.type) {
            case "pie":
                return (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                圖表標題
                            </label>
                            <input
                                id="title"
                                type="text"
                                {...register("title", { required: true })}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="輸入圖表標題"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="labelName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                數據標籤名稱
                            </label>
                            <input
                                id="labelName"
                                type="text"
                                {...register("labelName")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入標籤名稱"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dataValue"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                數據值
                            </label>
                            <input
                                id="dataValue"
                                type="text"
                                {...register("dataValue")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入數據值"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="color"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                顏色選擇
                            </label>
                            <input
                                id="color"
                                type="text"
                                {...register("color")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入顏色代碼"
                            />
                        </div>
                    </>
                );
            case "line":
                return (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                圖表標題
                            </label>
                            <input
                                id="title"
                                type="text"
                                {...register("title", { required: true })}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="輸入圖表標題"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="xAxis"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                X 軸標籤名稱
                            </label>
                            <input
                                id="xAxis"
                                type="text"
                                {...register("xAxis")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入 X 軸名稱"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="yAxis"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Y 軸標籤名稱
                            </label>
                            <input
                                id="yAxis"
                                type="text"
                                {...register("yAxis")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入 Y 軸名稱"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dataValue"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                數據值
                            </label>
                            <input
                                id="dataValue"
                                type="text"
                                {...register("dataValue")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入數據值"
                            />
                        </div>
                    </>
                );
            case "bar":
                return (
                    <>
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                圖表標題
                            </label>
                            <input
                                id="title"
                                type="text"
                                {...register("title", { required: true })}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="輸入圖表標題"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="xAxis"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                X 軸標籤名稱
                            </label>
                            <input
                                id="xAxis"
                                type="text"
                                {...register("xAxis")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入 X 軸名稱"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="yAxis"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Y 軸標籤名稱
                            </label>
                            <input
                                id="yAxis"
                                type="text"
                                {...register("yAxis")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入 Y 軸名稱"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dataValue"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                數據值
                            </label>
                            <input
                                id="dataValue"
                                type="text"
                                {...register("dataValue")}
                                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="選填，輸入數據值"
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {isOpen.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
                    <div
                        data-testid="select-dialog"
                        className="bg-white rounded-lg shadow-xl max-w-md w-full"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">
                                選擇資料來源
                            </h2>
                            <form
                            // onSubmit={handleSubmit(onSubmit)}
                            // className="bg-white rounded-lg shadow p-6 space-y-4"
                            >
                                {renderFields()}
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
    );
}
