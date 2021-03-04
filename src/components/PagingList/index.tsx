import "./styles.ts";

import { PagingList, PagingItem } from "./styles";

export interface Props {
  total: number;
  current: number;
  onChange(index: number): void;
}

export default function PaginList({ total, current, onChange }: Props) {
  const start = total > 5 ? (current - 2 < 1 ? 1 : current - 2) : 1;
  const end = total > 5 ? (start + 4 > total ? total : start + 4) : total;

  const indexes = [];
  for (let i = start; i <= end; i++) indexes.push(i);

  return (
    <PagingList className="paging-list">
      {indexes.map((i) => (
        <PagingItem key={`${i}`} data-selected={i === current} onClick={() => onChange(i)}>
          {i}
        </PagingItem>
      ))}
    </PagingList>
  );
}
