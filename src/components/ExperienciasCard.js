import SingleExperiencia from "./SingleExperiencia";

export default function ExperienciasCard() {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-11/12 mx-auto rounded-3xl my-7">
      <div className="flex flex-row justify-around gap-48 w-full">
        <h1 className="text-2xl py-3">Experiencias</h1>
        <button className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer pb-1 w-10 h-10 mt-2 rounded-full">
          +
        </button>
      </div>
      <div className="card w-11/12 mb-3 gap-3">
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
