import React from "react";
import { Rnd } from "react-rnd";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import AreaChart from "../charts/AreaChart";
import ScatterChart from "../charts/ScatterChart";

const MyRndComponent = ({
    chart,
    position,
    size,
    isDragging,
    onDragStart,
    onDragEnd,
    onPositionChange,
    onSizeChange,
    parentRef,
    trashRef,
    isOverTrash,
    setIsOverTrash,
    title = "自定義標題",
}) => {
    // 局部方法：處理與垃圾桶的碰撞檢測
    const checkTrashCollision = (x, y, width, height) => {
        if (trashRef.current && parentRef.current) {
            const parentRect = parentRef.current.getBoundingClientRect();
            const trashRect = trashRef.current.getBoundingClientRect();
            const draggableRect = {
                x: parentRect.left + x,
                y: parentRect.top + y,
                width,
                height,
            };

            const isOverlapping =
                draggableRect.x + draggableRect.width > trashRect.left &&
                draggableRect.y + draggableRect.height > trashRect.top;

            setIsOverTrash(isOverlapping);
        }
    };

    // 局部方法：處理拖動邏輯
    const handleDrag = (_e, d) => {
        onPositionChange({ x: d.x, y: d.y });
        checkTrashCollision(d.x, d.y, size.width, size.height);
    };

    // 局部方法：處理大小調整邏輯
    const handleResize = (_e, _direction, ref, _delta, position) => {
        const newSize = {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        };
        checkTrashCollision(
            position.x,
            position.y,
            newSize.width,
            newSize.height
        );
        onSizeChange(newSize, { x: position.x, y: position.y });
    };

    // 局部方法：渲染對應的圖表組件
    const renderChart = () => {
        switch (chart.type) {
            case "pie":
                return <PieChart />;
            case "line":
                return <LineChart />;
            case "bar":
                return <BarChart />;
            case "area":
                return <AreaChart />;
            case "scatter":
                return <ScatterChart />;
            default:
                return null;
        }
    };

    return (
        <Rnd
            data-testid={chart.type}
            position={position}
            size={size}
            minWidth={200}
            minHeight={200}
            bounds="parent"
            dragGrid={[10, 10]}
            className={`bg-white z-10 rounded-lg shadow-lg overflow-hidden cursor-move ${
                isOverTrash && isDragging ? "opacity-50" : ""
            }`}
            onDragStart={(_e, d) => onDragStart({ x: d.x, y: d.y })}
            onDrag={handleDrag}
            onDragStop={onDragEnd}
            onResize={handleResize}
            resizeGrid={[10, 10]}
        >
            {title && (
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-700 truncate">
                        {title}
                    </h3>
                </div>
            )}
            <div style={{ height: `${size.height - 32}px` }}>
                {renderChart()}
            </div>
        </Rnd>
    );
};

export default MyRndComponent;
