"use client"

import ApplicationCard from "@/components/ApplicationCard"
import LoadingSpinner from "@/components/LoadingSpinner";
import { useContext } from "react";
import SessionContext from "@/contexts/sessionContext";
import { useQuery } from '@tanstack/react-query';
import { getAllProjectsByAlunos } from '@/lib/api/services/project';

export default function applicationList() {

    const session = useContext(SessionContext);

    console.log(session.data)

    const { data: projects, error, isLoading } = useQuery({
        queryKey: ['projectsByAluno'],
        queryFn: () => getAllProjectsByAlunos({token: session.data.token}),
    });

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading projects: {error.message}</div>;

    return (
        <div>
            <h1 className="text-center justify-center mt-10">Minhas candidaturas</h1>
            <div className="flex justify-center mt-5">
            </div>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ApplicationCard
                        key={project.id}
                        titulo={project.name}
                        descricao={truncateText(project.description,150)}
                        habilidades={project.hab}
                        id={project.id}
                    />
                ))
            ) : (
                <div className="text-center mt-5">Nenhum projeto encontrado</div>
            )}
        </div>
    );
}