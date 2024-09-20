import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import SkillsCardNoAdd from '@/components/SkillsCardNoAdd';
import SessionContext from "@/contexts/sessionContext";

export default function Project({ titulo, nomeProfessor, lab, date, descricao, habilidades, vagas, quantIncritos, status }) {

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const formatStatus = (status) => {
        let statusText = "Pendente";
        let buttonColor = "btn btn-neutral";

        if (status === true) {
            statusText = "Aprovado";
            buttonColor = "btn btn-success";
        } else if (status === false) {
            statusText = "Reprovado";
            buttonColor = "btn btn-danger";
        }

        return { statusText, buttonColor };
    };

    const { statusText, buttonColor } = formatStatus(status)

    const formattedDate = new Date(formatDate(date)).toLocaleDateString('pt-BR');

    const router = useRouter();
    const queryClient = useQueryClient();

    const session = useContext(SessionContext);

    return (
        <div className="flex w-full justify-center items-center mt-10">
            <div className="card shadow-xl">
                <h2 className="card-title justify-center">{titulo}</h2>
                <div className="card-body">
                    <p className="nome text-[14px]">Criado Por: {nomeProfessor}</p>
                    <p className="Laboratorio text-[14px]">Responsável: {lab}</p>
                    <div className="flex justify-between items-center gap-1">
                        <p className="Data text-[14px]">Criação: {formattedDate}</p>
                        <div className="badge badge-secondary badge-outline">{quantIncritos} inscritos</div>
                        <div className="badge badge-accent badge-outline">{vagas} vagas</div>
                    </div>
                    <p className="descricao text-[18px]"
                        style={{ textAlign: 'justify', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {descricao}
                    </p>
                    <div className="flex flex-wrap space-x-2">
                        <SkillsCardNoAdd habilidades={habilidades} />
                    </div>
                    <div className="card-actions justify-center items-center mt-4">
                        <button className={buttonColor} style={{ width: '500px' }}>
                            {statusText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}