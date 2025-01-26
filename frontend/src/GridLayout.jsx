import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./GridLayout.css";

import LineChart from "./LineChart";
import List from "./List";
import TextBox from "./TextBox";
import ImageWidget from "./ImageWidget";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const widgetSizes = {
  lineChart: { w: 4, h: 8 },
  list: { w: 2.5, h: 7 },
  textBox: { w: 3, h: 4 },
  imageWidget: { w: 4, h: 6.5 },
};

const DashboardGrid = ({
  widgets: initialWidgets,
  onLayoutChange,
  removeWidget,
  theme,
}) => {
  // Initialize state with layout from localStorage or default
  const [layoutState, setLayoutState] = useState(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    return savedLayout
      ? JSON.parse(savedLayout)
      : initialWidgets.map((widget) => ({
          i: widget.id.toString(),
          x: widget.layout?.x || 0,
          y: widget.layout?.y || 0,
          w: widgetSizes[widget.type]?.w || 2,
          h: widgetSizes[widget.type]?.h || 2,
        }));
  });

  // Initialize widget state from localStorage or use provided initialWidgets
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("widgets");
    return savedWidgets ? JSON.parse(savedWidgets) : initialWidgets;
  });

  // Save layout and widgets to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboardLayout", JSON.stringify(layoutState));
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }, [layoutState, widgets]);

  // Render widget content based on type
  const renderWidgetContent = (widget) => {
    switch (widget.type) {
      case "lineChart":
        return <LineChart />;
      case "list":
        return <List theme={theme} items={widget.items || []} />;
      case "textBox":
        return <TextBox theme={theme} text={widget.text || ""} />;
      case "imageWidget":
        return <ImageWidget imageUrl={widget.imageUrl} />;
      default:
        return <div>{widget.id}</div>;
    }
  };

  // Handle layout change and update layout state
  const handleLayoutChange = (currentLayout) => {
    setLayoutState(currentLayout);
    onLayoutChange(currentLayout);
  };

  // Remove widget and update state accordingly
  const handleRemoveWidget = (id) => {
    const newWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(newWidgets);
    removeWidget(id); // Call the parent's removeWidget function to clean up
  };

  return (
    <div className={`grid-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <ResponsiveReactGridLayout
        layouts={{ lg: layoutState }}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        margin={[10, 10]}
        isResizable={true}
        isDraggable={true}
        isClickable={true}
        compactType="vertical"
        preventCollision={false}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id}
            data-grid={
              layoutState.find(
                (layout) => layout.i === widget.id.toString()
              ) || {
                i: widget.id.toString(),
                x: 0,
                y: Infinity,
                w: widgetSizes[widget.type]?.w || 2,
                h: widgetSizes[widget.type]?.h || 2,
              }
            }
            className="reactGridItem"
          >
            <div className="widget-content-wrapper">
              {renderWidgetContent(widget)}
              <div className="delete-overlay">
                <button
                  className="deleteButton"
                  onClick={() => handleRemoveWidget(widget.id)}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default DashboardGrid;
