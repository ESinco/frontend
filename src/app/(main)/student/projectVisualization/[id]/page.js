'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react";
import SessionContext from "@/contexts/sessionContext";
import { getProjectById } from '@/lib/api/services/project';
import Navbar from "@/components/NavBar";
import Project from '@/components/Project';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectVisualization() {
    const session = useContext(SessionContext);
    const { id } = useParams();

    const { data: project, error: projectError, isLoading: projectLoading } = useQuery({
        queryKey: ['projectVisualization', id],
        queryFn: () => getProjectById({
            projectId: id,
            token: session.data.token
        }),
        enabled: !!id,
    });

    if (projectLoading) return <LoadingSpinner />;
    if (projectError) return <div>Error loading project: {projectError.message}</div>;

    return (
        <div>
            <Navbar />
            <Project
                key={project.id}
                titulo={project.name}
                nomeProfessor={project.professor.nome}
                lab={project.lab}
                descricao={project.description}
                habilidades={project.hab}
                date={project.date}
                vagas={project.slots}
                quantIncritos={project.candidatesAmount}
                id={project.id}
            />
        </div>
    );
}