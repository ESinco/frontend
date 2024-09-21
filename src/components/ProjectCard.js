import Link from 'next/link';

export default function ProjectCard({
    id,
    name,
    description,
    lab, // Lab em que será desenvolvido
    date,
    slots,
    professor, // Professor responsavel
    candidatesAmount
}) {
    return (
        <div className="relative card bg-base-100 w-full shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="badge badge-accent badge-outline badge-lg absolute top-5 right-5">Status</div>
            <div className="relative card-body p-5 lg:p-7">
                <section className="flex justify-left items center">
                    <h2 className="w-[75%] whitespace-nowrap overflow-hidden text-ellipsis card-title text-white">{name}</h2>
                </section>

                <p className="text-ellipsis overflow-hidden max-h-[150px]">{description}</p>

                <div className="card-actions justify-end items-center">
                    <div className="absolute bottom-8 left-5">
                        <div className="badge badge-primary badge-lg">{`${candidatesAmount} Candidato(s)`}</div>
                    </div>
                    <Link 
                        className="btn btn-primary"
                        href={`/student/projectVisualization/${id}`}
                    >Detalhes</Link>
                </div>
            </div>
        </div>
    )
}