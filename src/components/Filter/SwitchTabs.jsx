import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selected, setSelected] = useState(0);
  const [left, setLeft] = useState(0);

  const activeMenu = (tab, index) => {
    setLeft(index * 100);
    // setTimeout(() => {
    //   setSelected(index);
    // }, 300);
    setSelected(index);
    onTabChange(tab, index);
  };
  return (
    <div className="tabContainer">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selected === index ? "active" : ""}`}
            onClick={() => activeMenu(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
