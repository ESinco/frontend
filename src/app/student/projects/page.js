"use client"

import ProjectCard from "@/components/ProjectCard";
import { useState } from 'react';

export default function projectList() {

    const [buscaProjeto, setBuscaProjeto] = useState("")

    return (

        <div>
            <h1 className="text-center justify-center mt-20"> Projetos </h1>
            <div className="flex justify-center mt-5">

                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={buscaProjeto}

                        onChange={e => setBuscaProjeto(e.target.value)}
                        className="pl-10 pr-20 py-2 rounded-full  focus:outline-none focus:ring shadow-lg"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {projetos.map((projeto) => <ProjectCard key={projeto.id_projeto} nome={projeto.nome} descricao={projeto.descricao} laboratorio={projeto.dono} responsavel={projeto.responsavel} />)}

        </div>
    )

}

const projetos = [
    {
        "id_projeto": 1,
        "nome": "Desenvolvimento de Aplicativo",
        "descricao": "Projeto para desenvolvimento de um aplicativo móvel para gestão de tarefas.",
        "dono": "LSD",
        "data_de_criacao": 20022003,
        "vagas": 5,
        "responsavel": "Luis Inacio"
    },
    {
        "id_projeto": 2,
        "nome": "Desenvolvimento de Aplicativo",
        "descricao": "Projeto para desenvolvimento de um aplicativo móvel para gestão de tarefas.",
        "dono": "Equipe de Desenvolvimento",
        "data_de_criacao": 14072024,
        "vagas": 5,
        "responsavel": "Luis Inacio"
    },
    {
        "id_projeto": 3,
        "nome": "Sistema de E-commerce",
        "descricao": "Projeto para criação de uma plataforma de e-commerce.",
        "dono": "Comércio Online",
        "data_de_criacao": 15032022,
        "vagas": 8,
        "responsavel": "Luis Inacio"
    },
    {
        "id_projeto": 4,
        "nome": "Website Institucional",
        "descricao": "Projeto para desenvolvimento de um website institucional.",
        "dono": "Marketing",
        "data_de_criacao": 10122021,
        "vagas": 3,
        "responsavel": "Luis Inacio"
    }
];