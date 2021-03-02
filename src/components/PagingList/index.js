import React from "react";

import "./styles.sass";

export default function PaginList({ total, current, onChange }) {
  const start = current - 2 < 1 ? 1 : current - 2;
  const end = start + 4 > total ? total : start + 4;

  const indexes = [];
  for (let i = start; i <= end; i++) indexes.push(i);

  return (
    <ul className="paging-list">
      {indexes.map((i) => (
        <li key={`${i}`} className={i === current ? "selected" : ""} onClick={() => onChange(i)}>
          {i}
        </li>
      ))}
    </ul>
  );
}
