'use client';

import { useRouter } from 'next/router';
import Navbar from "@/components/NavBar";
import Project from "@/components/Project";
import { getProject } from "@/lib/api/services/user";
import { useQuery } from '@tanstack/react-query';

export default function ProjectVisualization() {

    const project = {
        "id_projeto": 3,
        "nome": "Sistema de E-commerce",
        "descricao": "O projeto visa desenvolver uma plataforma de comércio eletrônico robusta e escalável, que permitirá a criação, gestão e operação de uma loja online. A plataforma será projetada para atender às necessidades tanto de pequenos empreendedores quanto de grandes empresas, oferecendo uma solução completa para a venda de produtos e serviços pela internet.",
        "laboratorio": "Equipe de Vendas",
        "data_de_criacao": 15082024,
        "vagas": 4,
        "responsavel": 2
      }
    
    return (
        <div>
            <Navbar/>
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
