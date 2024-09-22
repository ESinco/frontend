import SingleExperience from "./SingleExperience";
import ExperienciesModal from "@/components/ExperiencesModal";
export default function ExperiencesCard({ userData }) {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between align-center w-full p-6">
        <h1 className="text-2xl">Experiências</h1>
        <ExperienciesModal userData={userData} />
      </div>
      <div className="gap-3 p-3 pt-0 flex flex-col">
        {userData?.experiencias?.map((interesse, index) => (
          <p className="badge badge-primary" key={interesse.id}>
            {interesse.nome}
          </p>
        ))}
      </div>
    </div>
  );
}
