"use client"
import SessionContext from "@/contexts/sessionContext"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import SkillsCardStudent from "@/components/SkillsCardStudent"
import { getApplicationById } from "@/lib/api/services/project"
import { useEffect } from "react"

export default function ApplicationDetail({ params }) {
    const session = useContext(SessionContext)
    const project = useQuery({
        queryKey: [ "application_detail", params.projectId ],
        queryFn: () => getApplicationById(session.data.token, params.projectId)
    })

    useEffect(() => {console.log(project.data)}, [project.isLoading])
    return (
        <main className="w-full max_width p-5">
            <h1 className="w-full text-center text-xl mb-5">{project.data?.name}</h1>
            <section className="flex flex-col gap-5">
                <p>{`Laboratório: ${project.data?.lab}`}</p>
                <p>{`Criado por: ${project.data?.professor.nome}`}</p>
                <div className="flex justify-between items-center mb-5">
                    <p className="text-sm">{`Criação: ${project.data?.date}`}</p>
                    <div className="flex gap-2">
                        <div className="badge badge-secondary badge-outline">{`${project.data?.candidatesAmount} Candidatos`}</div>
                        <div className="badge badge-accent badge-outline">{`${project.data?.slots} Vagas`}</div>
                    </div>
                </div>

                <p className="text-md mb-5">{project.data?.description}</p>

                <div><SkillsCardStudent habilidades={project.data?.skills} /></div>
                
                <button
                    className="btn btn-neutral btn-wide w-full"
                >Pendente</button>
            </section>
        </main>
    )
}