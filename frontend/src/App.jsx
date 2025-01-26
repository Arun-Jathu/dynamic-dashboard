import React, { useEffect, useState } from "react";
import DashboardGrid from "./GridLayout"; // Import your GridLayout component
import {
  FaPlus,
  FaTextHeight,
  FaChartLine,
  FaList,
  FaImage,
  FaSun,
  FaMoon,
} from "react-icons/fa"; // Import theme icons
import "./App.css";

// Component for different widgets
const TextBoxWidget = ({ text }) => <div className="widget-text">{text}</div>;
const LineChartWidget = ({ data }) => (
  <div className="widget-chart">Chart: {data.join(", ")}</div>
);
const ListWidget = ({ items }) => (
  <ul className="widget-list">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
const ImageWidget = ({ imageUrl }) => (
  <img className="widget-image" src={imageUrl} alt="Widget" />
);

const App = () => {
  const [widgets, setWidgets] = useState([]); // State for widgets
  const [newWidgetType, setNewWidgetType] = useState("textBox"); // Type of widget to add
  const [theme, setTheme] = useState("light"); // Current theme state

  // Load saved widgets and theme from localStorage on component mount
  useEffect(() => {
    const savedWidgets = localStorage.getItem("widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets)); // Parse saved widgets
    }

    // Check saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Set saved theme
    }
  }, []);

  // Save widgets to localStorage whenever the widgets state changes
  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets)); // Persist widgets
  }, [widgets]);

  // Save the theme preference to localStorage and apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Apply theme to document
    localStorage.setItem("theme", theme); // Persist theme
  }, [theme]);

  // Add a new widget of the selected type
  const addWidget = () => {
    const newWidget = {
      id: Date.now(), // Unique ID based on current timestamp
      type: newWidgetType, // Type of widget (textBox, lineChart, etc.)
      layout: { x: 0, y: Infinity, w: 2, h: 2 }, // Initial layout
      data: newWidgetType === "lineChart" ? [10, 20, 30] : null,
      text: newWidgetType === "textBox" ? "New Text Box" : null,
      items: newWidgetType === "list" ? ["Item 1", "Item 2"] : null,
      imageUrl:
        newWidgetType === "imageWidget"
          ? "https://via.placeholder.com/300x200.png?text=Image+Widget"
          : null,
    };
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]); // Add widget to state
  };

  // Remove widget by ID
  const removeWidget = (id) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    ); // Remove widget by ID
  };

  // Update layout for widgets
  const onLayoutChange = (layout) => {
    console.log("Layout changed:", layout); // Debug log for layout change
    const updatedWidgets = widgets.map((widget) => {
      const widgetLayout = layout.find((l) => l.i === widget.id.toString());
      return widgetLayout
        ? { ...widget, layout: { ...widgetLayout } } // Update widget layout
        : widget;
    });
    setWidgets(updatedWidgets); // Update widgets state
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Debugging: Check widgets state and layout
  console.log("Current Widgets:", widgets);
  return (
    <div className="app-container">
      <div className="top-bar">
        <h1>Dynamic Dashboard</h1>
        <div className="controls">
          <div className="widget-icons">
            <button
              className="widget-icon"
              onClick={() => setNewWidgetType("textBox")}
            >
              <FaTextHeight />
            </button>
            <button
              className="widget-icon"
              onClick={() => setNewWidgetType("lineChart")}
            >
              <FaChartLine />
            </button>
            <button
              className="widget-icon"
              onClick={() => setNewWidgetType("list")}
            >
              <FaList />
            </button>
            <button
              className="widget-icon"
              onClick={() => setNewWidgetType("imageWidget")}
            >
              <FaImage />
            </button>
          </div>
          <button className="add-btn" onClick={addWidget}>
            <FaPlus /> Add Widget
          </button>
          <button onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
      <div className="dashboard-container">
        <DashboardGrid
          widgets={widgets} // Passing widgets as a prop
          onLayoutChange={onLayoutChange} // Handle layout changes
          removeWidget={removeWidget} // Pass the removeWidget function
          theme={theme} // Pass the current theme as prop
        />
      </div>
    </div>
  );
};

export default App;
