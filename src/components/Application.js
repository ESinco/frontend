import SkillsCard from "@/components/WantedSkillsCard";
import { useRouter } from 'next/navigation';


export default function Project({ titulo, nomeProfessor, responsavel, date, descricao, estado }) {

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const formattedDate = new Date(formatDate(date)).toLocaleDateString('pt-BR');

    const router = useRouter();
//trocar cor dentro do botão.
    //const cor = estado === "aprovado" ? "verde" 
            //: estado === "pendente" ? "cinza" 
            //: estado === "rejeitado" ? "vermelha" 
            //: "indefinida";


    //const handleCandidatarClick = () => {
        //router.
    //};

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
                        <button className="btn btn-primary" style={{ width: '200px' }}>{estado}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//<div className="badge badge-primary">primary</div>
//<div className="badge badge-neutral">neutral</div>