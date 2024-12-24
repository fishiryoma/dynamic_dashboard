import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: '一月', value: 400 },
  { name: '二月', value: 300 },
  { name: '三月', value: 600 },
  { name: '四月', value: 800 },
  { name: '五月', value: 500 },
  { name: '六月', value: 700 },
];

const DraggableLineChart = () => {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default DraggableLineChart;
