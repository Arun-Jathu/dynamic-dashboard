import React, { useState } from "react";
import "./List.css";

const List = ({ theme }) => {
  const initialItems = ["Item 1", "Item 2", "Item 3"];
  const [items, setItems] = useState(initialItems);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Start editing an item
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(items[index]);
  };

  // Handle input change when editing
  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  // Save edited item
  const saveEdit = () => {
    if (editText.trim() === "") return; // Avoid empty items
    const updatedItems = [...items];
    updatedItems[editingIndex] = editText;
    setItems(updatedItems);
    setEditingIndex(null);
    setEditText("");
  };

  // Handle Enter key press to save edit
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      saveEdit();
    }
  };

  // Add a new item
  const addNewItem = () => {
    setItems([...items, "New Item"]);
  };

  // Delete an item
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className={`list-widget-wrapper ${theme}`}>
      <div className={`list-container ${theme}`}>
        <h3 className={`list-title ${theme}`}>My List</h3>
        <ul className="styled-list">
          {items.map((item, index) => (
            <li key={index} className={`list-item ${theme}`}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  onBlur={saveEdit} // Save when input loses focu
                  onKeyDown={handleKeyPress} // Save when Enter is pressed
                  autoFocus
                  className={`edit-input ${theme}`} // Ensure theme is applied
                />
              ) : (
                <span>{item}</span>
              )}
              <div className="action-buttons">
                <span
                  onClick={() => startEditing(index)}
                  className="edit-btn"
                  title="Edit"
                >
                  🖊️
                </span>
                <span
                  onClick={() => deleteItem(index)}
                  className="delete-btn"
                  title="Delete"
                >
                  🗑️
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={addNewItem} className="add-btn" title="Add New Item">
          ➕
        </button>
      </div>
    </div>
  );
};

export default List;
