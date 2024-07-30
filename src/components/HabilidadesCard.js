export default function HabilidadesCard() {
  return (
    <div className="bg-base-100 flex flex-col items-start justify-between px-5 w-11/12 mx-auto rounded-3xl my-7 h-28">
      <h1 className="text-2xl py-3">Habilidades</h1>
      <div className="card-actions justify-end pb-4">
        <div className="badge badge-secondary">NEW</div>
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div>
    </div>
  );
}
