import { useState } from "react";
import HistoryTableRow from "./HistoryTableRow";
import NoDataFound from "./NoDataFound";

const discs = [
  {
    id: "123456s",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567a",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456c",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567f",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456yy",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567het",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456hetettheh6t",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567sytker8k",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456abtqw",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567ww",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
];

export default function HistoryTable() {
  const [history, setHistory] = useState(discs);

  if (history.length === 0) return <NoDataFound />
  return (
    <table className="table custom_shadow max-w-[1000px]">
        <thead>
            <tr>
            <th className="text-white font-normal">Cód</th>
            <th className="text-white font-normal">Nome</th>
            <th className="text-white font-normal">Nota</th>
            </tr>
        </thead>
        <tbody>
            {discs.map((disc) => (
                <HistoryTableRow
                    key={disc.id}
                    id={disc.id}
                    name={disc.name}
                    score={disc.score}
                />
            ))}
        </tbody>
    </table>
  );
}
