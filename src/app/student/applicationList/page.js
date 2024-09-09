"use client"

import ApplicationCard from "@/components/ApplicationCard"
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/NavBar";
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/lib/api/services/user';

export default function applicationList() {
    const { data: projects, error, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading projects: {error.message}</div>;

    return (
        <div>
            <Navbar/>
            <h1 className="text-center justify-center">Minhas candidaturas</h1>
            <div className="flex justify-center mt-5">
            </div>

            {projects.length > 0 ? (
            //Renderiza todos os projetos ou apenas os filtrados
                projects.map((project) => (
                    <ApplicationCard
                        key={project.id_projeto}
                        titulo={project.nome}
                        descricao={project.descricao}
                    />
                ))
            ) : (
                <div className="text-center mt-5">Nenhum projeto encontrado</div>
            )}
        </div>
    );
}