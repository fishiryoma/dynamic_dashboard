import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import DraggablePieChart from "./DraggablePieChart";
import DraggableLineChart from "./DraggableLineChart";
import DraggableBarChart from "./DraggableBarChart";

const DraggableResizableContainer = ({
  chart,
  setCharts,
  minConstraints = [200, 200],
  maxConstraints = [800, 800],
  onDragStart,
  setIsConfirmOpen,
  isOverTrash,
  setIsOverTrash,
  boundRef,
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(chart.position || { x: 100, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(chart.size || { width: 300, height: 300 });
  const [dragStartPosition, setDragStartPosition] = useState(null);
  const [bounds, setBounds] = useState({
    left: 100,
    top: 0,
    right: 0,
    bottom: 0,
  });

  // 網格大小設定
  const GRID_SIZE = 20;

  // 在組件掛載和視窗大小改變時更新邊界
  useEffect(() => {
    const updateBounds = () => {
      if (boundRef.current) {
        const parentRect = boundRef.current.getBoundingClientRect();
        setBounds({
          left: 110, // 最小 x 從 100 開始
          top: -10,
          right: parentRect.width - size.width - 10, // 減去 container 的寬度
          bottom: parentRect.height - size.height - 10, // 減去 container 的高度
        });
      }
    };

    // 初始化設定
    updateBounds();

    // 監聽視窗大小改變
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [size.width, size.height]);

  // 對齊到網格的輔助函數
  const snapToGrid = (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const handleDrag = (_e, data) => {
    // 將座標對齊到網格
    const snappedX = snapToGrid(data.x);
    const snappedY = snapToGrid(data.y);

    // 確保不會超出邊界
    const parentRect = boundRef.current.getBoundingClientRect();
    const finalX = Math.min(
      Math.max(snappedX, bounds.left),
      parentRect.width - size.width - 20
    );
    const finalY = Math.min(
      Math.max(snappedY, bounds.top),
      parentRect.height - size.height - 20
    );

    setPosition({ x: finalX, y: finalY });

    // 檢查是否在垃圾桶上方
    const draggableElement = containerRef.current;
    const trashBox = document.querySelector(".trash-box");
    if (draggableElement && trashBox) {
      const draggableRect = draggableElement.getBoundingClientRect();
      const trashRect = trashBox.getBoundingClientRect();
      const isOverlapping = !(
        draggableRect.right < trashRect.left ||
        draggableRect.left > trashRect.right ||
        draggableRect.bottom < trashRect.top ||
        draggableRect.top > trashRect.bottom
      );
      setIsOverTrash(isOverlapping);
    }
  };

  const onResize = (_event, { size: newSize, handle }) => {
    const parentRect = boundRef.current.getBoundingClientRect();

    // 對齊網格
    let snappedWidth = snapToGrid(newSize.width);
    let snappedHeight = snapToGrid(newSize.height);
    let newPosition = { ...position };

    // 計算新位置
    if (handle.includes("w")) {
      const widthDiff = size.width - snappedWidth;
      newPosition.x = position.x + widthDiff;
    }
    if (handle.includes("n")) {
      const heightDiff = size.height - snappedHeight;
      newPosition.y = position.y + heightDiff;
    }

    // 邊界檢查
    if (newPosition.x < bounds.left) {
      if (handle.includes("w")) {
        return;
      }
    }

    if (newPosition.y < bounds.top) {
      if (handle.includes("n")) {
        return;
      }
    }

    // 檢查右邊界
    if (newPosition.x + snappedWidth > parentRect.width - 20) {
      snappedWidth = parentRect.width - newPosition.x - 20;
      snappedWidth = snapToGrid(snappedWidth);
      if (snappedWidth < minConstraints[0]) return;
    }

    // 檢查下邊界
    if (newPosition.y + snappedHeight > parentRect.height - 20) {
      snappedHeight = parentRect.height - newPosition.y - 20;
      snappedHeight = snapToGrid(snappedHeight);
      if (snappedHeight < minConstraints[1]) return;
    }

    const newSizeObj = {
      width: snappedWidth,
      height: snappedHeight,
    };

    setSize(newSizeObj);
    setPosition(newPosition);

    setCharts((prevCharts) =>
      prevCharts.map((c) =>
        c.id === chart.id
          ? { ...c, position: newPosition, size: newSizeObj }
          : c
      )
    );
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setDragStartPosition(position);
    onDragStart && onDragStart();
  };

  const handleDragStop = () => {
    setIsDragging(false);
    if (isOverTrash) {
      setPosition(dragStartPosition);
      setIsConfirmOpen(true);
    } else {
      setCharts((prevCharts) =>
        prevCharts.map((c) => (c.id === chart.id ? { ...c, position } : c))
      );
    }
    setIsOverTrash(false);
  };

  const renderChart = () => {
    switch (chart.type) {
      case "pie":
        return <DraggablePieChart />;
      case "line":
        return <DraggableLineChart />;
      case "bar":
        return <DraggableBarChart />;
      default:
        return null;
    }
  };

  const resizeHandleStyles = {
    base: "absolute",
    positions: {
      se: "bottom-0 right-0 w-6 h-6 cursor-se-resize",
      ne: "top-0 right-0 w-6 h-6 cursor-ne-resize",
      nw: "top-0 left-0 w-6 h-6 cursor-nw-resize",
      sw: "bottom-0 left-0 w-6 h-6 cursor-sw-resize",
      // n: "top-0 left-0 w-full h-6 cursor-n-resize",
      s: "bottom-0 left-0 w-full h-6 cursor-s-resize",
      e: "top-0 right-0 h-full w-6 cursor-e-resize",
      w: "top-0 left-0 h-full w-6 cursor-w-resize",
    },
  };

  return (
    <Draggable
      position={position}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      handle=".drag-handle"
      grid={[GRID_SIZE, GRID_SIZE]}
      bounds={bounds}
    >
      <div
        ref={containerRef}
        className={`absolute ${
          isDragging ? "opacity-80" : ""
        } transition-opacity duration-200`}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={minConstraints}
          maxConstraints={maxConstraints}
          className="relative"
          resizeHandles={["n", "s", "e", "w", "ne", "nw", "se", "sw"]}
          // onResize={onResize}
          onResize={() => console.log("resize")}
          grid={[GRID_SIZE, GRID_SIZE]}
          handle={(h, ref) => (
            <div
              ref={ref}
              className={`${resizeHandleStyles.base} ${resizeHandleStyles.positions[h]}`}
            />
          )}
        >
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="drag-handle h-6 w-full bg-gray-100 hover:bg-gray-200 cursor-move flex items-center justify-center border-b border-gray-200 transition-colors duration-200">
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              </div>
            </div>
            <div className="p-4 relative" style={{ height: size.height - 24 }}>
              {renderChart()}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default DraggableResizableContainer;
