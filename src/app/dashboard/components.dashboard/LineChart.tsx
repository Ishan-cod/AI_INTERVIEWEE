import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
} from "recharts";

const data = [
  { date: "20-12-24", rating: 800 },
  { date: "24-12-80", rating: 1402 },
  { date: "16-11-24", rating: 1561 },
  { date: "14-11-89", rating: 1078 },
  { date: "15-12-79", rating: 1241 },
  { date: "12-08-89", rating: 1364 },
  { date: "17-09-98", rating: 1241 },
  { date: "17-09-98", rating: 1561 },
  { date: "17-09-98", rating: 1402 },
  { date: "17-09-98", rating: 1400 },
  { date: "17-09-98", rating: 1400 },
  { date: "17-09-98", rating: 1364 },
  { date: "17-09-98", rating: 1241 },
  { date: "17-09-98", rating: 1400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 text-white p-3 rounded-lg shadow-lg">
        <p className="text-sm">Date: {label}</p>
        <p className="text-sm">Rating: {payload[0].value}</p>
      </div>
    );
  }
  return null;
}; 

export function Linechart() {
  return (
    <>
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
        className="border-0"
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip/>}/>
        <Legend />
        <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      </LineChart>
    </>
  );
}
