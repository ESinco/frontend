import Link from "next/link";

export default function ProjectCard({ titulo, descricao, habilidades, id }) {

    const badgeColors = ["badge-primary", "badge-secondary", "badge-accent", "badge-ghost"];

    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl" style={{ maxWidth: '400px', maxHeight: '600px', overflow: 'hidden' }}>
                <div className="card-title flex justify-center">
                    <h2>{titulo}</h2>
                </div>
                <div className="card-body ">
                    <p>{descricao}</p>
                    <div className="card-actions flex justify-between items-center" >
                        <div className="flex flex-wrap space-x-2">
                            {habilidades.slice(0, 3).map((habilidade, index) => (
                                <div key={index} className={`badge ${badgeColors[index % badgeColors.length]}`}>{habilidade}</div>
                            ))}
                            {habilidades.length > 3 && (
                                <div className="badge badge-neutral">+{habilidades.length - 3}</div>
                            )}
                        </div>
                        <Link className="btn btn-primary ml-auto" 
                            href = {`/student/applicationVisualization/${id}`}>Acompanhar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}