import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import TrashBox from "./components/TrashBox";
import Sidebar from "./components/Sidebar";
import ConfirmDialog from "./components/modals/ConfirmDialog";
import SelectDataDialog from "./components/modals/SelectDataDialog";
// import DraggableResizableContainer from "./components/DraggableResizableContainer";
import "./index.css";
import MyRndComponent from "./components/containers/DemoReactRnd";

function App() {
    // 從 localStorage 讀取儲存的資料
    const [charts, setCharts] = useState(() => {
        const saved = localStorage.getItem("dashboardCharts");
        return saved ? JSON.parse(saved) : [];
    });

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectDataOpen, setSelectDataOpen] = useState({
        open: false,
        type: "",
    });

    const [isOverTrash, setIsOverTrash] = useState(false);
    const [draggingChartId, setDraggingChartId] = useState(null);
    const trashRef = useRef(null);
    const parentRef = useRef(null);

    // 建立延遲儲存函數
    const debouncedSave = useMemo(
        () =>
            debounce((data) => {
                localStorage.setItem("dashboardCharts", JSON.stringify(data));
            }, 500),
        []
    );

    // 當 charts 改變時儲存到 localStorage
    useEffect(() => {
        debouncedSave(charts);
    }, [charts, debouncedSave]);

    const handleAddChart = (type) => {
        const newChart = {
            id: Date.now(),
            type,
            position: { x: 10, y: 10 },
            startPosition: { x: 10, y: 10 },
            size: { width: 320, height: 200 }, // 預設尺寸
        };
        setCharts([...charts, newChart]);
    };

    const handleDeleteChart = () => {
        if (draggingChartId && isOverTrash) {
            setCharts(charts.filter((chart) => chart.id !== draggingChartId));
            setDraggingChartId(null);
        }
        setIsConfirmOpen(false);
        setIsOverTrash(false);
    };

    const handleDragStart = (chartId, position) => {
        setDraggingChartId(chartId);
        setCharts(
            charts.map((chart) =>
                chart.id === chartId
                    ? {
                          ...chart,
                          startPosition: position,
                      }
                    : chart
            )
        );
    };

    const handleDragEnd = () => {
        if (isOverTrash) {
            setIsConfirmOpen(true);
        } else {
            setDraggingChartId(null);
            setIsOverTrash(false);
        }
    };

    const handlePositionChange = (chartId, newPosition) => {
        setCharts(
            charts.map((chart) =>
                chart.id === chartId
                    ? {
                          ...chart,
                          position: newPosition,
                      }
                    : chart
            )
        );
    };

    // 新增 size 變更處理函數
    const handleSizeChange = (chartId, newSize, newPosition) => {
        setCharts(
            charts.map((chart) =>
                chart.id === chartId
                    ? {
                          ...chart,
                          size: newSize,
                          position: newPosition,
                      }
                    : chart
            )
        );
    };

    const handleCancelDelete = () => {
        const chartToReset = charts.find(
            (chart) => chart.id === draggingChartId
        );
        if (chartToReset) {
            setCharts(
                charts.map((chart) =>
                    chart.id === draggingChartId
                        ? {
                              ...chart,
                              position: chart.startPosition,
                          }
                        : chart
                )
            );
        }
        setDraggingChartId(null);
        setIsConfirmOpen(false);
        setIsOverTrash(false);
    };

    const renderChart = (chart) => {
        const props = {
            chart,
            position: chart.position,
            size: chart.size,
            isDragging: chart.id === draggingChartId,
            onDragStart: (position) => handleDragStart(chart.id, position),
            onDragEnd: () => handleDragEnd(),
            onPositionChange: (position) =>
                handlePositionChange(chart.id, position),
            onSizeChange: (size) => handleSizeChange(chart.id, size),
            setIsConfirmOpen,
            isOverTrash,
            setIsOverTrash,
            parentRef,
            trashRef,
        };

        return <MyRndComponent key={chart.id} {...props} />;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                自組裝動態儀表板
            </h1>
            <div className="flex h-[80vh] gap-4">
                <Sidebar setSelectDataOpen={setSelectDataOpen} />
                <div
                    id="white-borad"
                    ref={parentRef}
                    className="flex-1 bg-white rounded-lg shadow-lg relative"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                >
                    {charts.map(renderChart)}
                    <TrashBox isOverTrash={isOverTrash} trashRef={trashRef} />
                    <ConfirmDialog
                        isOpen={isConfirmOpen}
                        onClose={() => {
                            setIsConfirmOpen(false);
                            handleCancelDelete();
                        }}
                        onConfirm={handleDeleteChart}
                    />
                    <SelectDataDialog
                        isOpen={selectDataOpen}
                        onClose={() => setSelectDataOpen(false)}
                        onConfirm={() => {
                            handleAddChart(selectDataOpen.type);
                            setSelectDataOpen(false);
                        }}
                        // data-testid="select-dialog"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
