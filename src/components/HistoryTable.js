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
];

export default function HistoryTable() {
  return (
    <div className="overflow-x-auto w-11/12">
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
