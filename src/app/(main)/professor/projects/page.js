"use client"

import { useQuery } from "@tanstack/react-query";
import ProfessorProjectCard from "@/components/ProfessorProjectCard";
import CreateProject from "@/components/modals/CreateProject";
import { useContext, useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";
import { getProfessorProjects } from "@/lib/api/services/project";

const mockProject = {
    name: "Desenvolvimento de estruturas",
    description: "lorem ipsum ultra plus mega supra omnis lux luces azaron metreon zipsilon",
    date: new Date(),
    owner: "LSD",
    slots: 5,
}

export default function Projects() {
    const session = useContext(SessionContext)

    const projects = useQuery({
        queryKey: ["professor_projects"],
        queryFn: () => getProfessorProjects(session.data.id),
    })

    useEffect(() => {console.log(projects.data)}, [projects.isLoading])

    return (
        <main className="w-full">
            <section className="pt-10 flex justify-center items-center gap-5">
                <h1>Meus Projetos</h1>
                <button
                    className="btn btn-primary btn-xs"
                >Adicionar +</button>
            </section>
            { projects.isLoading && !!projects.data }
            { projects.data?.map(project => <ProfessorProjectCard {...project}/>) }
            <CreateProject.Modal currentData={{}}/>
        </main>
    )
}