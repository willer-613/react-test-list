import React, { useCallback, useEffect } from "react";
import { data as initialData } from "./data";
import TableBody from "./TableBody";
import "./styles.css";
import HeaderCell from "./HeaderCell";
import HeaderCheckbox from "./HeaderCheckbox";

const sortFunction = (data, key, sortOrder) => {
  return data.sort((a, b) => {
    if (typeof a[key] === "string") {
      if (sortOrder === "asc") return a[key].localeCompare(b[key]);
      return b[key].localeCompare(a[key]);
    }

    if (sortOrder === "asc") return a[key] > b[key] ? 1 : -1;
    return b[key] > a[key] ? 1 : -1;
  });
};

const Table = () => {
  const [data, setData] = React.useState(
    initialData.map((data) => ({ ...data, ...{ check: true } }))
  );
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [checked, setChecked] = React.useState(false);

  const sortData = (key) => {
    const sorted = sortFunction(data, key, sortOrder);
    setData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const onChange = (id) => {
    setData(
      data.map((d) => {
        if (d.id === id) {
          d.check = !d.check;
        }
        return d;
      })
    );
  };

  useEffect(() => {
    setChecked(data.every((d) => d.check));
  }, [data]);

  const headerCheck = () => {
    setChecked(!checked);
    setData((da) =>
      da.map((d) => {
        d.check = !checked;
        return d;
      })
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <HeaderCheckbox headerCheck={headerCheck} checked={checked} />
          <HeaderCell field="id" header="ID" sortData={sortData} />
          <HeaderCell
            field="first_name"
            header="First name"
            sortData={sortData}
          />
          <HeaderCell
            field="last_name"
            header="Last name"
            sortData={sortData}
          />
          <HeaderCell field="email" header="E-mail" sortData={sortData} />
          <HeaderCell field="gender" header="Gender" sortData={sortData} />
        </tr>
      </thead>

      <TableBody data={data} onChange={onChange} />
    </table>
  );
};

export default Table;
