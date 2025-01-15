export default function PieForm() {
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
}
