import React, { useState } from "react";

const TableInput = ({ index, value, onChange }) => {
  const [showNote, setShowNote] = useState(false);
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      onChange(newValue); // Pass the new value directly
      setShowNote(false); // Clear error message
      if (newValue > 10) {
        setMessage("Maximum acceptable value is 10");
        setShowNote(true);
      } else {
        setMessage(""); // Clear error message
      }
    } else {
      setShowNote(true);
      setMessage("Only numeric values acceptable");
    }
  };

  const handleBlur = () => {
    setShowNote(false); // Clear error message when the input loses focus
  };

  return (
    <div>
      <input
        type="text"
        className="full-width-input"
        style={{ width: "200px", marginLeft: "20px", marginRight: "10px" }}
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
      />
      <div>
        {showNote && <span style={{ color: "red", fontSize: "12px" }}>{message}</span>}
      </div>
    </div>
  );
};

export default TableInput;
