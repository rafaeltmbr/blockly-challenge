import React from "react";

import "./styles.sass";

export default function PaginList({ total, current, onChange }) {
  const start = total > 5 ? (current - 2 < 1 ? 1 : current - 2) : 1;
  const end = total > 5 ? (start + 4 > total ? total : start + 4) : total;

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
