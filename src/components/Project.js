import SkillsCard from "@/components/WantedSkillsCard";

export default function Project({ titulo, nomeProfessor, responsavel, date, descricao }) {

    const dateString = String(date);
    const formattedDate = new Date(`${dateString.slice(4, 8)}-${dateString.slice(2, 4)}-${dateString.slice(0, 2)}`).toLocaleDateString('pt-BR');

    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl">
                <h2 className="card-title justify-center">{titulo}</h2>
                <div className="card-body">
                    <p className="nome text-[14px]">Criado Por: {nomeProfessor}</p>
                    <p className="Laboratorio text-[14px]">Responsável: {responsavel}</p>
                    <div className="flex justify-between items-center">
                        <p className="Data text-[14px]">Criação: {formattedDate}</p>
                        <div className="badge badge-secondary badge-outline">secondary</div>
                        <div className="badge badge-accent badge-outline">accent</div>
                    </div>
                    <p className="descricao text-[18px]">{descricao}</p>
                    <SkillsCard />
                    <div className="card-actions justify-center items-center">
                        <button className="btn btn-primary" style={{ width: '200px' }}>Candidatar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//<div className="badge badge-primary">primary</div>
//<div className="badge badge-neutral">neutral</div>