"use client";
import HistoryTable from "@/components/HistoryTable";
import "./styles.css";

export default function HistoryPage({ history }) {
  return (
    <div className="flex justify-center items-center gap-3 flex-col mt-10 w-full p-3 pb-6">
      <h1 className="mb-10 text-2xl">Histórico</h1>
      <HistoryTable />
      <input
        type="file"
        className="mt-5 file-input file-input-bordered file-input-accent w-full max-w-xs"
      />
    </div>
  );
}
