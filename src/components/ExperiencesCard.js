import SingleExperience from "./SingleExperience";
import ExperienciesModal from "@/components/ExperiencesModal";
export default function ExperiencesCard() {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between align-center w-full p-6">
        <h1 className="text-2xl">Experiências</h1>
        <ExperienciesModal />
      </div>
      <div className="card w-full gap-3 p-3 pt-0">
        <SingleExperience
          title={"Splab"}
          descricao={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
          }
          badges={["NEW", "Fashion"]}
        ></SingleExperience>
        <SingleExperience
          title={"Splab"}
          descricao={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
          }
          badges={["NEW", "Fashion"]}
        ></SingleExperience>
      </div>
    </div>
  );
}
