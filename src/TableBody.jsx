import React from "react";
import "./styles.css";
import throttle from "lodash.throttle";

const itemRowHeight = 32; // same height as each row (32px, see styles.css)
const screenHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
); // get the height of the screen
const offset = screenHeight; // We want to render more than we see, or else we will see nothing when scrolling fast
const rowsToRender = Math.floor((screenHeight + offset) / itemRowHeight);

const TableBody = ({ data, onChange }) => {
  const [displayStart, setDisplayStart] = React.useState(0);
  const [displayEnd, setDisplayEnd] = React.useState(0);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const setDisplayPositions = React.useCallback(
    (scroll) => {
      console.log(scroll, "scroll");

      // we want to start rendering a bit above the visible screen
      const scrollWithOffset = Math.floor(scroll - rowsToRender - offset / 2);
      // start position should never be less than 0
      const displayStartPosition = Math.round(
        Math.max(0, Math.floor(scrollWithOffset / itemRowHeight))
      );

      // end position should never be larger than our data array
      const displayEndPosition = Math.round(
        Math.min(displayStartPosition + rowsToRender, data.length)
      );

      setDisplayStart(displayStartPosition);
      setDisplayEnd(displayEndPosition);
    },
    [data.length]
  );

  // We want to set the display positions on renering
  React.useEffect(() => {
    // console.log(scrollPosition, "scrollPosition");
    setDisplayPositions(scrollPosition);
  }, [scrollPosition, setDisplayPositions]);

  // add event listeners so we can change the scroll position, and alter what rows to display
  React.useEffect(() => {
    const onScroll = throttle((e) => {
      console.log(e, "eee");
      if (data.length !== 0) {
        setScrollPosition(window.scrollY);
      }
    }, 100);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setDisplayPositions, data.length]);

  const rows = [];

  // add a filler row at the top. The further down we scroll the taller this will be
  rows.push(
    <tr
      key="startRowFiller"
      style={{ height: displayStart * itemRowHeight }}
    ></tr>
  );

  // add the rows to actually render
  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i];
    if (row !== undefined) {
      rows.push(
        <tr
          key={row.id}
          className="Row"
          onClick={(e) => {
            [...e.currentTarget.parentElement.children].forEach(
              (element) => (element.style.background = "")
            );
            !e.currentTarget.style.background &&
              (e.currentTarget.style.background = "red");
          }}
        >
          <td>
            <input
              type="checkbox"
              name=""
              checked={row.check}
              onChange={() => {
                onChange(row.id);
              }}
            />
          </td>
          <td>{row.id}</td>
          <td>{row.first_name}</td>
          <td>{row.last_name}</td>
          <td>{row.email}</td>
          <td>{row.gender}</td>
        </tr>
      );
    }
  }

  // add a filler row at the end. The further up we scroll the taller this will be
  rows.push(
    <tr
      key="endRowFiller"
      style={{ height: (data.length - displayEnd) * itemRowHeight }}
    ></tr>
  );

  return <tbody>{rows}</tbody>;
};

export default TableBody;
