"use client";

import ExperiencesCard from "@/components/ExperiencesCard";
import SkillsCard from "@/components/SkillsCard";
import InterestsCard from "@/components/InterestsCard";
import ProfileModal from "@/components/ProfileModal";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import StudentRating from "@/components/StudentRating";
import SessionContext from "@/contexts/sessionContext";
import { getStudentData, getVisuPerfil } from "@/lib/api/services/user";
import { useQuery } from "@tanstack/react-query";

export default function UserProfilePage() {
  const pathname = usePathname();
  const session = useContext(SessionContext);

  const aluno = useQuery({
    queryKey: ["visu_perfil_data"],
    queryFn: () => getVisuPerfil(session.data.token, session.data.matricula),
  });

  if (!aluno.data) {
    <LoadingSpinner />;
  }

  if (aluno.data == null) {
    return <LoadingSpinner />;
  }

  if (session.data == null) {
    return <LoadingSpinner />;
  }
  console.log(aluno.data);
  return (
    <div className="bg-base-200 flex justify-start flex-col items-center p-3 w-full h-screen">
      {/* DIV INFORMACOES INICIAIS */}
      <div className="flex justify-center flex-col w-full items-start mb-6">
        <div className=" flex flex-row items-center w-full">
          <p className="mx-auto text-xl my-6">{aluno.data?.nome}</p>
          <div className="flex flex-col items-center gap-3">
            <ProfileModal aluno={aluno.data}></ProfileModal>
          </div>
        </div>
        <Link
          href="/student/history"
          className="btn btn-primary btn-xs ml-auto"
        >
          Histórico
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                fill="#FFFFFF"
              />
            </svg>
            <p>{aluno.data?.email}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                fill="#FFFFFF"
              />
              <path
                d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                fill="#FFFFFF"
              />
              <path
                d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                fill="#FFFFFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                fill="#FFFFFF"
              />
            </svg>
            <a
              className="hover:underline text-blue-500"
              href={
                aluno.data?.linkedin?.startsWith("http")
                  ? aluno.data?.linkedin
                  : `https://${aluno.data.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {aluno.data?.linkedin}
            </a>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="#FFFFFF"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
            <a
              className="hover:underline text-blue-500"
              href={
                aluno.data?.github?.startsWith("http")
                  ? aluno.data?.github
                  : `https://${aluno.data.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {aluno.data?.github}
            </a>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              fill="#FFFFFF"
              class="bi bi-link-45deg"
              viewBox="0 0 16 16"
            >
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
            </svg>
            <a
              className="hover:underline text-blue-500"
              href={
                aluno.data?.curriculo?.startsWith("http")
                  ? aluno.data?.curriculo
                  : `https://${aluno.data.curriculo}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {aluno.data?.curriculo}
            </a>
          </div>
        </div>
      </div>
      <div className="gap-5 flex flex-col w-full">
        {/* EXPERIENCIAS COMPONENT */}
        <ExperiencesCard userData={aluno.data}></ExperiencesCard>
        {/* HABILIDADES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}

        <SkillsCard userData={aluno.data}></SkillsCard>
        {/* INTERESSES CARD - THINK ABOUT A WAY TO MAKE BADGE 'CLASSES' EACH ONE'LL HAVE A SYMBOL AND A COLOR */}
        <InterestsCard userData={aluno.data}></InterestsCard>
      </div>
    </div>
  );
}
