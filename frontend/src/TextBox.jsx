import React, { useState } from "react";
import "./TextBox.css";

const TextBox = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="text-box-widget-wrapper">
      <div className="text-box-container">
        <div className="input-wrapper">
          <textarea
            id="textBox"
            value={text}
            onChange={handleChange}
            placeholder=" "
            className="text-box-input"
            maxLength="500"
          ></textarea>
          <label htmlFor="textBox" className="text-box-label">
            Type your text here...
          </label>
        </div>
        <div className="text-box-footer">
          <span className="character-counter">{text.length} / 500</span>
        </div>
      </div>
    </div>
  );
};

export default TextBox;
