"use client";
import { useContext, useState } from "react";
import SkillsModal from "./SkillsModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentData } from "@/lib/api/services/user";
import SessionContext from "@/contexts/sessionContext";
import InterestsModal from "./InterestsModal";

export default function SkillsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const session = useContext(SessionContext);

  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementById("Interests").close();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.getElementById("Interests").showModal();
  };

  const userData = useQuery({
    queryKey: ["visu_perfil_data"],
    queryFn: () => getVisuPerfil(session.data.token, session.data.matricula),
  });

  console.log("userData" + JSON.stringify(userData?.data?.interesses));

  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between w-full py-3">
        <h1 className="text-2xl py-3">Interesses</h1>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <InterestsModal
          isOpen={openModal}
          onClose={closeModal}
          userData={userData.data}
        />
      </div>
      <div className="w-full card-actions justify-end pb-4">
        {session?.data?.interesses?.map((interesse, index) => (
          <p key={interesse.id}>{interesse.nome}</p>
        ))}
      </div>
    </div>
  );
}
