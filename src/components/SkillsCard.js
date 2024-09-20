export default function HabilidadesCard(habilidades) {

  const badgeColors = ["badge-primary", "badge-secondary", "badge-accent", "badge-ghost"];
  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
      <div className="flex flex-row justify-between w-full py-3">
        <h1 className="text-2xl py-3">Habilidades</h1>
        <button className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer md:mr-0 pb-1 w-10 h-10 mt-2 rounded-full">
          +
        </button>
      </div>
      <div className="w-full card-actions justify-end pb-4">
      </div>
    </div>
  );
}
