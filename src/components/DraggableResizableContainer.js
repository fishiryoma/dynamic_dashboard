import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import DraggablePieChart from './DraggablePieChart';
import DraggableLineChart from './DraggableLineChart';
import DraggableBarChart from './DraggableBarChart';

const DraggableResizableContainer = ({
  chart,
  defaultPosition = { x: 0, y: 0 },
  defaultSize = { width: 300, height: 300 },
  minConstraints = [200, 200],
  maxConstraints = [800, 800],
  onDragStart,
  setIsConfirmOpen,
  isOverTrash,
  setIsOverTrash
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(defaultSize);

  // 網格大小設定
  const GRID_SIZE = 20;

  // 對齊到網格的輔助函數
  const snapToGrid = (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const handleDrag = (_e, data) => {
    // 將座標對齊到網格
    const snappedX = snapToGrid(data.x);
    const snappedY = snapToGrid(data.y);

    setPosition({ x: snappedX, y: snappedY });

    // 檢查是否在垃圾桶上方
    const draggableElement = containerRef.current;
    const trashBox = document.querySelector('.trash-box');
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

  // 調整大小時也對齊網格
  const onResize = (_event, { size }) => {
    setSize({
      width: snapToGrid(size.width),
      height: snapToGrid(size.height)
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart && onDragStart();
  };

  const handleDragStop = () => {
    setIsDragging(false);
    if (isOverTrash) {
      setPosition(defaultPosition);
      setIsConfirmOpen(true);
    }
    setIsOverTrash(false);
  };

  const renderChart = () => {
    switch (chart.type) {
      case 'pie':
        return <DraggablePieChart />;
      case 'line':
        return <DraggableLineChart />;
      case 'bar':
        return <DraggableBarChart />;
      default:
        return null;
    }
  };

  return (
    <Draggable
      position={position}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      handle=".drag-handle"
      grid={[GRID_SIZE, GRID_SIZE]} // 添加網格對齊
    >
      <div
        ref={containerRef}
        className={`absolute ${isDragging ? 'opacity-80' : ''} transition-opacity duration-200`}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={minConstraints}
          maxConstraints={maxConstraints}
          className="relative"
          resizeHandles={['se']}
          onResize={onResize}
          grid={[GRID_SIZE, GRID_SIZE]} // 調整大小時也使用網格
          handle={(h, ref) => (
            <div
              ref={ref}
              className={`
                absolute w-4 h-4 bg-blue-500 rounded-sm 
                transition-opacity duration-200
                opacity-50 hover:opacity-100
                ${h === 'se' ? 'bottom-0 right-0 cursor-se-resize' : ''}
              `}
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