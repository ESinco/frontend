"use client"

import ProjectCard from "@/components/ProjectCard";
import { useState } from 'react';
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '@/lib/api/services/user';
import { getProfessorName } from "@/lib/api/services/user";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/NavBar";

export default function ProjectList() {

    const [nomeProjetoBuscado, setnomeProjetoBuscado] = useState("");
    const { data: projects, error, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects,
    });

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    const [professores, setProfessores] = useState({});

    useEffect(() => {
        if (projects) {
            const fetchProfessorNames = async () => {
                const professorNames = {};
                for (const project of projects) {
                    const nomeProfessor = await getProfessorName(project.responsavel);
                    professorNames[project.responsavel] = nomeProfessor;
                }
                setProfessores(professorNames);
            };
            fetchProfessorNames();
        }
    }, [projects]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error loading projects: {error.message}</div>;

    const projetosFiltrados = projects.filter((project) =>
        project.nome.toLowerCase().includes(nomeProjetoBuscado.toLowerCase())
    );

    const projetosExibidos = nomeProjetoBuscado ? projetosFiltrados : projects;

    return (
        <div>
            <Navbar/>
            <h1 className="text-center justify-center">Projetos</h1>
            <div className="flex justify-center mt-5">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={nomeProjetoBuscado}
                        onChange={(e) => setnomeProjetoBuscado(e.target.value)}
                        className="pl-10 pr-20 py-2 rounded-full focus:outline-none focus:ring shadow-lg"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            {projetosExibidos.length > 0 ? (
                // Renderiza todos os projetos ou apenas os filtrados
                projetosExibidos.map((project) => (
                    <ProjectCard 
                    key={project.id_projeto}
                    nome={project.nome}
                    descricao={truncateText(project.descricao, 150)}
                    laboratorio={project.laboratorio}
                    responsavel={professores[project.responsavel]}
                    id={project.id_projeto}
                    />
                ))
            ) : (
                <div className="text-center mt-5">Nenhum projeto encontrado</div>
            )}
        </div>
    );
}