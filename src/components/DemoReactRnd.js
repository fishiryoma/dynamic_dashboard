import React, { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import DraggablePieChart from "./DraggablePieChart";

const MyRndComponent = ({
  parentRef,
  trashRef,
  isOverTrash,
  setIsOverTrash,
}) => {
  const [dimensions, setDimensions] = useState({
    width: 320,
    height: 200,
  });

  const isOverlappingWithTrash = (draggableRect) => {
    const trashRect = trashRef.current.getBoundingClientRect();
    const isOverlapping =
      draggableRect.x + draggableRect.width > trashRect.left &&
      draggableRect.y + draggableRect.height > trashRect.top;
    setIsOverTrash(isOverlapping);
  };

  const handleDrag = (_e, d) => {
    if (trashRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const draggableRect = {
        x: parentRect.left + d.x,
        y: parentRect.top + d.y,
        width: dimensions.width,
        height: dimensions.height,
      };

      isOverlappingWithTrash(draggableRect);
    }
  };

  const handleResize = (_e, _direction, ref, _delta, position) => {
    setDimensions({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    if (trashRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const draggableRect = {
        x: parentRect.left + position.x,
        y: parentRect.top + position.y,
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      };
      isOverlappingWithTrash(draggableRect);
    }
  };

  const handleDragStop = () => {
    if (isOverTrash) {
      console.log("TRASH");
      //   setIsConfirmOpen(true);
    }
    setIsOverTrash(false);
  };

  return (
    <Rnd
      default={{
        x: 10,
        y: 10,
        width: dimensions.width,
        height: dimensions.height,
      }}
      minWidth={200}
      minHeight={200}
      bounds="parent"
      dragGrid={[20, 20]}
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-move ${
        isOverTrash && "opacity-50"
      }`}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResize={handleResize}
      resizeGrid={[20, 20]}
    >
      <DraggablePieChart />
    </Rnd>
  );
};

export default MyRndComponent;
