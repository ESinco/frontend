import { useRouter } from 'next/navigation';

export default function ProjectCard({ nome, descricao, laboratorio, responsavel, id }) {

    const router = useRouter();

    const handleCandidatarClick = () => {
        router.push(`/student/projectVisualization/${id}`);
    };

    //ver as badges depois!!!!!!
    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl">
                <h2 className="card-title justify-center">{nome}</h2>
                <div className="card-body">
                    <p className="descricao text-[12px]">{laboratorio}</p>
                    <p className="Laboratorio text-[12px]">{responsavel}</p>
                    <p>{descricao}</p>
                    <div className="card-actions flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="badge badge-primary">primary</div>
                            <div className="badge badge-neutral">neutral</div>
                        </div>
                        <button className="btn btn-primary" 
                            onClick={handleCandidatarClick} >Candidatar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}