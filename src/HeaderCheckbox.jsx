import React from "react";
import "./styles.css";
import { v4 as uuid } from "uuid";

const HeaderCell = ({ checked, headerCheck }) => {
  const unique_id = uuid().slice(0, 8);

  console.log(unique_id, "unique_id");

  return (
    <th className="Header" role="button" tabIndex={0}>
      <div className="Resizable">
        <input
          className="color-input-red chat-button-location-radio-input"
          type="checkbox"
          id={unique_id}
          checked={checked}
          onChange={headerCheck}
        />
        <label htmlFor={unique_id}></label>
      </div>
    </th>
  );
};

export default React.memo(
  HeaderCell,
  (prevProps, nextProps) => prevProps.checked === nextProps.checked
);
