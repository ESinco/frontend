"use client"

import ProjectCard from "@/components/ProjectCard";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/lib/api/services/project';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectList() {
    const [termoBuscado, setTermoBuscado] = useState("");
    
    const projects = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects,
    });

    if (projects.isLoading) return <LoadingSpinner />;
    if (projects.error) return <div>Error loading projects: {error.message}</div>;
    return (
        <main className="w-full flex flex-col items-center justify-center p-5 gap-5">
            <h1 className="text-center justify-center mt-10">Projetos</h1>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow w-full"
                    placeholder="Search"
                    value={termoBuscado ?? ""}
                    onChange={e => setTermoBuscado(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>

            <div className="flex items-center justify-center flex-col w-full gap-5 max_width">
                {
                    projects.data
                        .filter(project => 
                            project.name.toLowerCase().includes(termoBuscado.toLowerCase()) ||
                            project.description.toLowerCase().includes(termoBuscado.toLowerCase()) ||
                            project.professor.nome.toLowerCase().includes(termoBuscado.toLowerCase())
                        )
                        .map(project => <ProjectCard {...project} />)
                }
            </div>
        </main>
    );
}
