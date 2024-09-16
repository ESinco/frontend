'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProject, getProfessorName } from '@/lib/api/services/user';
import Navbar from "@/components/NavBar";
import Project from '@/components/Project';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectVisualization() {
    const { id } = useParams();

    const { data: project, error: projectError, isLoading: projectLoading } = useQuery({
        queryKey: ['projectVisualization', id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });

    const professorId = project?.responsavel;

    const { data: professorName, error: professorError, isLoading: professorLoading } = useQuery({
        queryKey: ['professorName', professorId],
        queryFn: () => getProfessorName(professorId),
        enabled: !!professorId,
    });

    if (projectLoading || professorLoading) return <LoadingSpinner />;
    if (projectError) return <div>Error loading project: {projectError.message}</div>;
    if (professorError) return <div>Error loading professor: {professorError.message}</div>;

    return (
        <div>
            <Navbar />
            <Project
                titulo={project.nome}
                nomeProfessor={professorName} 
                responsavel={project.laboratorio}
                date={project.data_de_criacao}
                descricao={project.descricao}
            />
        </div>
    );
}
