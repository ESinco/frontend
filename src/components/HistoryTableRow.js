export default function HistoryTableRow({ id, name, score }) {
  return (
    <tr>
      <th>{id}</th>
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  );
}
