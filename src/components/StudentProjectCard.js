import Link from 'next/link';

export default function ProjectCard({
    id,
    name,
    description,
    lab, // Lab em que será desenvolvido
    date,
    slots,
    professor, // Professor responsavel
    candidatesAmount,
    skills,
    status,
    isCandidate
})
{
    let stats = "Aberto"

    if(isCandidate == true){
        stats = status === true ? "Aprovado" :
                    status === false ? "Reprovado" : 
                    status === null ? "Pendente" : "";
    }

    const badgeColors = ["badge-primary", "badge-secondary", "badge-accent", "badge-ghost"];
    return (
        <div className="relative card bg-base-100 w-full shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className={`badge ${stats=== "Aberto" ? "badge-accent" : stats === "Aprovado" ? "badge-accent" : stats === "Reprovado" ? "badge-error" : stats === "Pendente" ? "badge-warning" : ""} badge-lg absolute top-5 right-5`}>{stats}</div>
            <div className="relative card-body p-5 lg:p-7">
                <section className="flex justify-left items center">
                    <h2 className="w-[75%] whitespace-nowrap overflow-hidden text-ellipsis card-title text-white">{name}</h2>
                </section>
                <p className="text-ellipsis">{lab}</p>
                <p className="text-ellipsis">{professor.nome}</p>
                <p className="text-ellipsis overflow-hidden max-h-[150px]">{description}</p>
                <div className="card-actions flex justify-between items-center">
                    <div className="flex flex-wrap space-x-2">
                        {skills.slice(0, 4).map((skill, index) => (
                            <div key={index} className={`badge ${badgeColors[index % badgeColors.length]}`}>{skill}</div>
                        ))}
                        {skills.length > 4 && (
                            <div className="badge badge-neutral">+{skills.length - 4}</div>
                        )}
                    </div>
                    <div className="card-actions justify-end items-center">
                        <Link
                            className="btn btn-primary"
                            href={`/student/applications/${id}`}
                        >Detalhes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}