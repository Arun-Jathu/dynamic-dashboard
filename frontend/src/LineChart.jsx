import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./LineChart.css";

const LineChartWidget = () => {
  const defaultData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 600 },
    { name: "Mar", value: 700 },
    { name: "Apr", value: 500 },
    { name: "May", value: 800 },
    { name: "Jun", value: 900 },
  ];

  const [chartData, setChartData] = useState(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState("");

  const handleDataChange = (e) => {
    setNewData(e.target.value);
  };

  const handleUpdateData = () => {
    try {
      const parsedData = JSON.parse(newData);
      setChartData(parsedData);
      setIsEditing(false);
    } catch (error) {
      alert("Invalid data format. Please enter a valid JSON array.");
    }
  };

  return (
    <div className="line-chart-widget">
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid className="grid" />
            <XAxis className="axis" dataKey="name" />
            <YAxis className="axis" />
            <Tooltip className="tooltip" />
            <Legend className="legend" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4a90e2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="chart-edit-form">
          <textarea
            value={newData}
            onChange={handleDataChange}
            placeholder="Enter new chart data in JSON format"
            className="edit-input"
          />
          <button className="add-btn" onClick={handleUpdateData}>
            Update Data
          </button>
        </div>
      )}
    </div>
  );
};

export default LineChartWidget;
