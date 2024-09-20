"use client";

import { useEffect, useState } from "react";
import HistoryTableRow from "./HistoryTableRow";
import NoDataFound from "./NoDataFound";

export default function HistoryTable(data) {
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
        {data.historyData.disciplinas.map((elem, index) => (
          <HistoryTableRow
            key={elem.codigo}
            id={elem.codigo}
            name={elem.nome}
            score={elem.media}
          />
        ))}
      </tbody>
    </table>
  );
}
