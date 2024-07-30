export default function ExperienciasCard() {
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center w-11/12 mx-auto rounded-3xl my-7">
      <h1 className="text-2xl py-3">Experiencias</h1>
      <div className="card bg-base-300 w-11/12 mb-3">
        <div className="card-body p-4">
          <h2 className="card-title">Shoes!</h2>
          <p className="text-xs">
            Descrição Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation 
          </p>
          <div className="card-actions justify-end ">
            <div className="badge badge-secondary">NEW</div>
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  );
}
