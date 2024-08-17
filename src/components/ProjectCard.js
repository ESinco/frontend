export default function ProjectCard(nome, descricao, laboratorio, data_de_criacao) {
    return (
        <div className="flex justify-center items-center mt-10">
                <div className="card w-80 shadow-xl">
                        <h2 className="card-title justify-center">Mariposas</h2>
                    <div className="card-body">
                        <p className="Laboratorio"  style={{ fontSize: '12px' }}>Laboratório de Sistemas Integrados</p>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Candidatar</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}