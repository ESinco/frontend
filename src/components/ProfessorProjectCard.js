

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
        <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <section>
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                </section>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}