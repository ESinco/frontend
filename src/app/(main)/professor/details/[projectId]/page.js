"use client"
import LoadingSpinner from "@/components/LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";
import { getProjectById } from "@/lib/api/services/project";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext } from "react";
import SkillsCard from "@/components/SkillsCard";
import AdicionarColaborador from "@/components/modals/AdicionarColaborador";

export default function ProjectDetails({ params }) {
    const session = useContext(SessionContext)

    const project = useQuery({
        queryKey: [ "professor_project", params.projecId ],
        queryFn: () => getProjectById({
            projectId: params.projectId,
            token: session.data.token
        })
    })

    if(project.isLoading) return <LoadingSpinner />
    return (
        <main className="w-full max_width p-5">
            <h1 className="w-full text-center text-xl mb-5">{project.data?.name}</h1>
            <section className="flex flex-col gap-5">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-sm">{`Criação: ${project.data?.date}`}</p>
                    <div className="flex gap-2">
                        <div className="badge badge-secondary badge-outline">{`${project.data?.candidatesAmount} Candidatos`}</div>
                        <div className="badge badge-accent badge-outline">{`${project.data?.slots} Vagas`}</div>
                    </div>
                </div>

                <p className="text-md">{project.data?.description}</p>
                <h1 className="w-full pt-10 text-center text-xl">Professores Colaboradores</h1> 
                <section className="flex justify-center items-center gap-5">
                    <button
                        className="btn btn-primary btn-xs"
                        onClick={e => {
                            e.stopPropagation()
                            AdicionarColaborador.open()
                        }}
                    >Adicionar Colaborador</button>
                </section>
                {(project.data?.colaboradores && project.data.colaboradores.length > 0) ?
                    <div className="pt-5">
                        <div>
                            <ul>
                            {project.data.colaboradores.map(colaborador => (
                                <div className="flex justify-between">
                                    <li className="text-center" key={`projeto-${project.data?.id}-colaborador-${colaborador.id_professor}`}>
                                    {colaborador.professor.email}
                                    </li>
                                </div>
                            ))}
                            </ul>
                        </div>
                    </div>
                :
                    <></>
                }

                <Link
                    className="btn btn-primary btn-wide w-full"
                    href={`/professor/details/${project.data?.id}/manage`}
                >Gerenciar Candidaturas</Link>
            </section>
            <AdicionarColaborador.Modal projectId={project.data?.id}/>
        </main>
    )
}