"use client"
import LoadingSpinner from "@/components/LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";
import { getProjectById } from "@/lib/api/services/project";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext } from "react";
import SkillsCard from "@/components/SkillsCard";

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

                <Link
                    className="btn btn-primary btn-wide w-full"
                    href={`/professor/details/${project.data?.id}/manage`}
                >Gerenciar Candidaturas</Link>
            </section>
        </main>
    )
}