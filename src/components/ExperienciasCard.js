import SingleExperiencia from "./SingleExperiencia";

export default function ExperienciasCard() {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between align-center w-full p-6">
        <h1 className="text-2xl">Experiências</h1>
        <button className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer pb-1 w-10 h-10 rounded-full">
          +
        </button>
      </div>
      <div className="card w-full mb-3 gap-3 p-6 pt-0">
        <SingleExperiencia
          title={"Splab"}
          descricao={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
          }
          badges={["NEW", "Fashion"]}
        ></SingleExperiencia>
        <SingleExperiencia
          title={"Splab"}
          descricao={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation "
          }
          badges={["NEW", "Fashion"]}
        ></SingleExperiencia>
      </div>
    </div>
  );
}
