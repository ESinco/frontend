import { useState } from "react";
import HistoryTableRow from "./HistoryTableRow";

const discs = [
  {
    id: "123456",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "123456",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
  {
    id: "1234567",
    name: "Teoria Dos Grafos",
    score: "8,5",
  },
];

export default function HistoryTable() {
  const [history, setHistory] = useState(discs);

  if (history.length === 0) {
    return (
      <div className="my-10 flex flex-row gap-3 items-center justify-center w-full">
        <button className="btn btn-square btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p>Nenhum dado encontrado</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-11/12 bottom-shadow">
      <table className="table table-xs bg-base-100">
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
    </div>
  );
}
