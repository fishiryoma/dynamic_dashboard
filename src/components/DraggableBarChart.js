import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '一月', value: 400 },
  { name: '二月', value: 300 },
  { name: '三月', value: 600 },
  { name: '四月', value: 800 },
  { name: '五月', value: 500 },
  { name: '六月', value: 700 },
];

const DraggableBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DraggableBarChart;
