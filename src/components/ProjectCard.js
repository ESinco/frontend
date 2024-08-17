export default function ProjectCard({nome, descricao, laboratorio, responsavel}) {

    //ver as badges depois!!!!!!
    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl">
                <h2 className="card-title justify-center">{nome}</h2>
                <div className="card-body">
                    <p className="descricao text-[12px]">{laboratorio}</p>
                    <p className="Laboratorio text-[12px]">{responsavel}</p>
                    <p>{descricao}</p>
                    <div className="card-actions justify-end items-center">
                        <div className="badge badge-primary">primary</div>
                        <div className="badge badge-neutral">neutral</div>
                        <button className="btn btn-primary">Candidatar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}