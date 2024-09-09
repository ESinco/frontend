export default function ProjectCard({ titulo, descricao }) {

    //ver as badges depois!!!!!!
    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl">
                <div className="card-title flex justify-center">
                    <h2>{titulo}</h2>
                </div>
                <div className="card-body">
                    <p>{descricao}</p>
                    <div className="card-actions flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="badge badge-primary">primary</div>
                            <div className="badge badge-neutral">neutral</div>
                        </div>
                        <button className="btn btn-primary">Acompanhar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}