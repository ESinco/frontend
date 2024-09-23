import { useContext } from "react";
import SingleExperience from "./SingleExperience";
import ExperienciesModal from "@/components/ExperiencesModal";
import SessionContext from "@/contexts/sessionContext";
export default function ExperiencesCard({ userData }) {
  const session = useContext(SessionContext);
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between align-center w-full p-6">
        <h1 className="text-2xl">Experiências</h1>
        {!session.data.isTeacher ? (
          <ExperienciesModal userData={userData} />
        ) : null}
      </div>
      <div className="w-full card-actions justify-start p-4">
        {userData?.experiencias?.map((interesse, index) => (
          <span className="badge badge-info text-xs" key={interesse.id}>
            {interesse.nome}
          </span>
        ))}
      </div>
    </div>
  );
}
