"use client";
import HistoryTable from "@/components/HistoryTable";

export default function HistoryPage({ history }) {
  return (
    <div className="flex justify-center items-center gap-3 flex-col mt-4">
      <h1>Histórico</h1>
      <HistoryTable />
      <input
        type="file"
        className="mt-5 file-input file-input-bordered file-input-accent w-full max-w-xs"
      />
    </div>
  );
}
