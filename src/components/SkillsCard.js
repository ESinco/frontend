"use client";
import { useContext, useState } from "react";
import SkillsModal from "./SkillsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentData, getVisuPerfil } from "@/lib/api/services/user";
import SessionContext from "@/contexts/sessionContext";

export default function SkillsCard({ userData }) {
  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between w-full py-3">
        <h1 className="text-2xl py-3">Habilidades</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <SkillsModal userData={userData} />
      </div>
      <div className="w-full card-actions justify-start pb-4">
        {userData?.habilidades?.map((habilidade, index) => (
          <p className="badge badge-primary text-xs" key={habilidade.id}>
            {habilidade.nome}
          </p>
        ))}
      </div>
    </div>
  );
}
