import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectCard({ nome, descricao, laboratorio, responsavel, habilidades, id }) {

    const badgeColors = ["badge-primary", "badge-secondary", "badge-accent", "badge-ghost"];

    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl" style={{ maxWidth: '400px', maxHeight: '600px', overflow: 'hidden' }}>
                <h2 className="card-title justify-center">{nome}</h2>
                <div className="card-body">
                    <p className="descricao text-[12px]">{laboratorio}</p>
                    <p className="Laboratorio text-[12px]">{responsavel}</p>
                    <p className="descricao"
                        style={{ textAlign: 'justify', whiteSpace: 'normal', wordBreak: 'break-word' }}
                    >{descricao}</p>
                    <div className="card-actions flex justify-between items-center">
                        <div className="flex flex-wrap space-x-2">
                            {habilidades.slice(0, 3).map((habilidade, index) => (
                                <div key={index} className={`badge ${badgeColors[index % badgeColors.length]}`}>{habilidade}</div>
                            ))}
                            {habilidades.length > 3 && (
                                <div className="badge badge-neutral">+{habilidades.length - 3}</div>
                            )}
                        </div>
                        <Link className="btn btn-primary ml-auto" 
                            href = {`/student/projectVisualization/${id}`}>Detalhes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
