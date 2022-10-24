import React from "react";
import "./styles.css";

const HeaderCell = ({ header, field, sortData }) => {
  return (
    <th
      className="Header"
      role="button"
      tabIndex={0}
      onClick={() => sortData(field)}
    >
      <div className="Resizable">{header}</div>
    </th>
  );
};

export default HeaderCell;
