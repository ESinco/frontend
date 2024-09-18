"use client"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getProjectById } from "@/lib/api/services/project"
import { useQuery } from "@tanstack/react-query"

export default function ProjectDetails({ params }) {
    const projects = useQuery({
        queryKey: [ "professor_projects", params.projecId ],
        queryFn: () => getProjectById(params.projectId)
    })

    if(projects.isLoading) return <LoadingSpinner />
    return (
        <main className="w-full max_width p-5">
            <h1 className="w-full text-center text-xl mb-5">{projects.data.name}</h1>
            <section>
                <div className="flex justify-between items-center mb-5">
                    <p className="text-sm">{`Criação: ${projects.data.date}`}</p>
                    <div className="flex gap-2">
                        <div className="badge badge-secondary badge-outline">{`${projects.data.candidatesAmount} Candidatos`}</div>
                        <div className="badge badge-accent badge-outline">{`${projects.data.slots} Vagas`}</div>
                    </div>
                </div>

                <p className="text-md">{projects.data.description}</p>

                <div>HABILIDADES DESEJADAS</div>
            </section>
        </main>
    )
}