"use client"

import { useQuery } from "@tanstack/react-query";
import ProfessorProjectCard from "@/components/ProfessorProjectCard";
import CreateProject from "@/components/modals/CreateProject";
import { useContext, useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";
import { getProfessorProjects } from "@/lib/api/services/project";

export default function Projects() {
    const session = useContext(SessionContext)

    const projects = useQuery({
        queryKey: ["teacher_projects"],
        queryFn: () => getProfessorProjects(session.data.id),
    })

    return (
        <main>
            <section className="pt-10 flex justify-center items-center gap-5">
                <h1>Meus Projetos</h1>
                <button
                    className="btn btn-primary btn-xs"

                >Adicionar +</button>
            </section>
            <ProfessorProjectCard />
            <CreateProject.Modal currentData={{}}/>
        </main>
    )
}