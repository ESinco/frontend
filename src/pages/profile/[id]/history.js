import HistoryTable from "@/components/HistoryTable";

export default function HistoryPage({ history }) {
  return (
    <div className="flex justify-center items-center gap-3 flex-col mt-4">
      <h1>Histórico</h1>
      <HistoryTable />
    </div>
  );
}
