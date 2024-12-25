import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import TrashBox from "./components/TrashBox";
import Sidebar from "./components/Sidebar";
import ConfirmDialog from "./components/ConfirmDialog";
import SelectDataDialog from "./components/SelectDataDialog";
import DraggableResizableContainer from "./components/DraggableResizableContainer";
import "./index.css";
import MyRndComponent from "./components/DemoReactRnd";

function App() {
  const [charts, setCharts] = useState(() => {
    // 初始化時從 localStorage 讀取
    const saved = localStorage.getItem("dashboardCharts");
    return saved ? JSON.parse(saved) : [];
  });
  const [chartToDelete, setChartToDelete] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectDataOpen, setSelectDataOpen] = useState({
    open: false,
    type: "",
  });
  const [isOverTrash, setIsOverTrash] = useState(false);

  const boundRef = useRef(null);

  const debouncedSave = useMemo(
    () =>
      debounce((data) => {
        localStorage.setItem("dashboardCharts", JSON.stringify(data));
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSave(charts);
  }, [charts]);

  const handleAddChart = (type) => {
    const newChart = {
      id: Date.now(),
      type,
    };
    setCharts([...charts, newChart]);
  };

  const handleDeleteChart = () => {
    if (chartToDelete) {
      setCharts(charts.filter((chart) => chart.id !== chartToDelete));
      setChartToDelete(null);
    }
    setIsConfirmOpen(false);
  };

  const renderChart = (chart) => {
    const props = {
      setCharts,
      onDragStart: () => setChartToDelete(chart.id),
      setIsConfirmOpen: (boolean) => setIsConfirmOpen(boolean),
      isOverTrash,
      setIsOverTrash,
      boundRef,
    };

    return (
      <DraggableResizableContainer key={chart.id} chart={chart} {...props} />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        動態儀表板
      </h1>
      <div
        ref={boundRef}
        className="w-full h-[80vh] bg-white rounded-lg shadow-lg relative"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <MyRndComponent />
        <Sidebar
          onAddChart={handleAddChart}
          setSelectDataOpen={setSelectDataOpen}
        />
        <TrashBox isOverTrash={isOverTrash} />
        {charts.map(renderChart)}
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => {
            setIsConfirmOpen(false);
            setChartToDelete(null);
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
        />
      </div>
    </div>
  );
}

export default App;
