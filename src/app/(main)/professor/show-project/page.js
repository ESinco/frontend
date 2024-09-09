"use client";

import CandidaturasCard from "@/components/CandidaturasCard";
import SkillsCard from "@/components/SkillsCard";
import { useState } from "react";

const candidates = [
  { id: 1, name: "Dante Alighieri" },
  { id: 2, name: "Clarice Lispector" },
  { id: 3, name: "Sra. Leite das Neves" },
];

export default function ProjectPage() {
  return (
    <div className="w-full flex justify-center bg-base-200 min-h-screen">
      <div className="pt-5 w-11/12 flex flex-col gap-10">
        <h2 className="text-lg text-center ">Titulo do Projeto</h2>
        <div className="flex flex-row justify-between ">
          <p>Criação: 26/12/1999</p>
          <div className="flex gap-2">
            <p className="badge badge-secondary badge-outline">
              322 candidatos
            </p>
            <p className="badge badge-accent badge-outline">12 vagas</p>
          </div>
        </div>
        <p>
          Descrição do projeto: Ele desenvolveu o seu trabalho artístico por
          mais de setenta anos entre Florença e Roma, onde viveram seus grandes
          mecenas, a família Medici de Florença, e vários papas romanos.
          Iniciou-se como aprendiz dos irmãos Davide e Domenico Ghirlandaio em
          Florença
        </p>
        <SkillsCard title={"Habilidades"} />
        <CandidaturasCard />
      </div>
    </div>
  );
}
