"use client"
import { useQuery } from "@tanstack/react-query";
import ProfessorProjectCard from "@/components/ProfessorProjectCard";
import CreateProject from "@/components/modals/CreateProject";
import EditProject from "@/components/modals/EditProject";
import { useContext, useState,useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";
import { getProfessorProjects } from "@/lib/api/services/project";

export default function Projects() {
    const session = useContext(SessionContext);
    const [ editData, setEditData ] = useState({});

    const projects = useQuery({
        queryKey: ["professor_projects"],
        queryFn: () => getProfessorProjects(session.data.id, session.data.token),
    })

    function requestEdit(currentProjectData) {
        setEditData({...currentProjectData})
        EditProject.open();
    }

    useEffect(() => {console.log(projects.data)}, [projects.isLoading])

    return (
        <main className="w-full flex flex-col items-center justify-center">
            <section className="pt-10 flex justify-center items-center gap-5">
                <h1>Meus Projetos</h1>
                <button
                    className="btn btn-primary btn-xs"
                    onClick={e => {
                        e.stopPropagation()
                        CreateProject.open()
                    }}
                >Adicionar +</button>
            </section>
            <section className="flex flex-col justify-start items-center gap-5 w-full max_width p-3">
                { projects.isLoading && !!projects.data }
                { projects.data?.map(project => <ProfessorProjectCard key={project.id} {...project} requestEdit={requestEdit} />) }
            </section>
            <CreateProject.Modal />
            <EditProject.Modal editData={editData} />
        </main>
    )
}