export default function SingleExperiencia({ title, descricao, badges }) {
  return (
    <div className="card-body p-4 bg-base-300 rounded-xl">
      <h2 className="card-title">{title}</h2>
      <p className="text-xs">{descricao}</p>
      <div className="card-actions justify-end ">
        {badges.map((badge, index) => (
          <div key={index} className="badge badge-secondary">{badge}</div>
        ))}
        {/* <div className="badge badge-outline"></div> */}
      </div>
    </div>
  );
}
