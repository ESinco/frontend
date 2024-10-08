export default function SkillsCardStudent({ habilidades }) {
    const badgeColors = ["badge-primary", "badge-secondary", "badge-accent"];

    return (
      <div className="bg-base-100 flex flex-col items-start justify-between px-6 w-full rounded-3xl custom_shadow">
        <div className="flex flex-row justify-between w-full py-3">
          <h1 className="text-2xl py-3">Habilidades Desejadas</h1>
        </div>
        <div className="w-full card-actions justify-end pb-4">
          {habilidades && habilidades.length > 0 ? (
            habilidades.map((habilidade, index) => (
              <div key={index} className={`badge ${badgeColors[index % badgeColors.length]}`}>{habilidade.nome}</div>
            ))
          ) : (
            <p>Nenhuma habilidade disponível</p>
          )}
        </div>
      </div>
    );
  }
