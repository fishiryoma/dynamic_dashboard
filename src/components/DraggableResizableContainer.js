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

  const handleDrag = (_e, data) => {
    setPosition({ x: data.x, y: data.y });
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

  const onResize = (_event, { size }) => {
    setSize({ width: size.width, height: size.height });
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
    >
      <div 
        ref={containerRef} 
        className={`absolute ${isDragging ? 'opacity-80' : ''} transition-opacity duration-200`}
      >
        <ResizableBox
          width={defaultSize.width}
          height={defaultSize.height}
          minConstraints={minConstraints}
          maxConstraints={maxConstraints}
          className="relative"
          resizeHandles={['se']}
          onResize={onResize} 
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
            {/* 拖曳把手 */}
            <div className="drag-handle h-6 w-full bg-gray-100 hover:bg-gray-200 cursor-move flex items-center justify-center border-b border-gray-200 transition-colors duration-200">
              {/* 拖曳指示器 */}
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              </div>
            </div>
            
            {/* 圖表容器 */}
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