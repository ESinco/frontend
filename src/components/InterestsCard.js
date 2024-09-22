"use client";
import { useContext, useEffect, useState } from "react";
import SkillsModal from "./SkillsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentData } from "@/lib/api/services/user";
import SessionContext from "@/contexts/sessionContext";
import InterestsModal from "./InterestsModal";

export default function InterestsCard({ userData }) {
  const session = useContext(SessionContext);

  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between w-full py-3">
        <h1 className="text-2xl py-3">Interesses</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {!session.data.isTeacher ? (
          <InterestsModal userData={userData} />
        ) : null}
      </div>
      <div className="w-full card-actions justify-start pb-4">
        {userData?.interesses?.map((interesse, index) => (
          <p className="badge badge-primary text-xs" key={interesse.id}>
            {interesse.nome}
          </p>
        ))}
      </div>
    </div>
  );
}
