"use client"
import SessionContext from "@/contexts/sessionContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import SkillsCardStudent from "@/components/SkillsCardStudent"
import { getApplicationById, getApplications, applyInProject } from "@/lib/api/services/project"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ApplicationDetail({ params }) {
    const queryClient = useQueryClient();
    const session = useContext(SessionContext)
    const project = useQuery({
        queryKey: [ "application_detail", params.projectId ],
        queryFn: () => getApplicationById(session.data.token, params.projectId)
    })
    const currentStatus = useQuery({
        queryKey: [ "applications" ],
        queryFn: async () => {
            const data = await getApplications(session.data.token);
            for(const application of data) {
                console.log(application)
                console.log("projectid: ", params.projectId)
                console.log("appl.id: ", application.id)
                if(application.id == params.projectId) {
                    console.log("ACHEI")
                    return String(application.status)
                }
                return "";
            }
        },
    })
    const applicationMutation = useMutation({
        mutationFn: () => applyInProject({
            token: session.data.token,
            projectId: params.projectId
        }),
        onSuccess: () => {
            queryClient.invalidateQueries([ "applications" ])
        }
    })

    useEffect(() => {console.log(`currentStatus: >${currentStatus.data}<`)}, [currentStatus.data])
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
                    className={
                        `btn-wide w-full btn btn-${currentStatus === "true" ? "accent" : currentStatus.data === "" ? "primary" : "error"}`
                    }
                    disabled={currentStatus.data === "null" || currentStatus.data === undefined}
                    onClick={applicationMutation.mutate}
                >                    
                    {currentStatus.data === undefined && <LoadingSpinner />}
                    {currentStatus.data === "" && "Candidatar-se"}
                    {currentStatus.data === "true" && "APROVADO"}
                    {currentStatus.data === "false" && "REJEITADO"}
                    {currentStatus.data === "null" && "PENDENTE"}
                    
                </button>
            </section>
        </main>
    )
}