import React from "react";
import { Rnd } from "react-rnd";
import DraggablePieChart from "./DraggablePieChart";

const MyRndComponent = () => {
  return (
    <Rnd
      default={{
        x: 110,
        y: 0,
        width: 320,
        height: 200,
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent"
      dragGrid={[20, 20]}
      className="bg-white w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <DraggablePieChart />
    </Rnd>
  );
};

export default MyRndComponent;
