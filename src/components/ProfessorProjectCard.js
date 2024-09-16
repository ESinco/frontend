export default function ProfessorProjectCard({
    id,
    name,
    description,
    owner, // Lab em que será desenvolvido
    date,
    slots,
    professor, // Professor responsavel
}) {
    return (
        <div className="relative card bg-base-100 w-full shadow-xl">
            <div className="badge badge-accent badge-outline badge-lg absolute top-5 right-5">Status</div>
            <div className="relative card-body p-5 lg:p-7">
                <section className="flex justify-center items center">
                    <h2 className="card-title">{name}</h2>
                </section>

                <p className="text-ellipsis overflow-hidden max-h-[150px]">{description}</p>

                <div className="card-actions justify-end items-center">
                    <div className="absolute bottom-8 left-5">
                        <div className="badge badge-primary badge-lg">500 Candidato(s)</div>
                    </div>
                    <button className="btn btn-primary w-[110px]">Editar</button>
                </div>
            </div>
        </div>
    )
}