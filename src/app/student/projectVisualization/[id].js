'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '@/lib/api/services/user';
import Navbar from "@/components/NavBar";
import Project from '@/components/Project';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProjectVisualization() {

    const { id } = useParams();

    const { data: project, error, isLoading } = useQuery({
        queryKey: ['projectVisualization', id],
        queryFn: () => getProject(id),
        enabled: !!id,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading project: {error.message}</div>;

    return (
        <div>
            <Navbar />
            <Project
                titulo={project.nome}
                nomeProfessor={project.responsavel}
                responsavel={project.laboratorio}
                date={project.data_de_criacao}
                descricao={project.descricao}
            />
        </div>
    );
}
