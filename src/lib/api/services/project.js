import { notifyUser } from "@/lib/adapters/notifier";
import api from "..";

export async function createProject(projectData) {
    const response = await api.post(
        "/projeto/cadastrar/", 
        {
            ...projectData,
            nome: projectData.name,
            descricao: projectData.description,
            laboratorio: projectData.lab,
            vagas: projectData.slots, // quant de vagas
        },
        {
            headers: { Authorization: `Bearer ${projectData.token}` }
        }
    );
    notifyUser({
        type: "success",
        message: `Projeto "${projectData.name}" foi criado com sucesso`
    })
    return response.data;
}

export async function updateProject(projectData) {
    const response = await api.post(
        "/projeto/cadastrar/", 
        {
            ...projectData,
            id_projeto: projectData.id,
            nome: projectData.name,
            descricao: projectData.description,
            laboratorio: projectData.lab,
            vagas: projectData.slots, // quant de vagas
        },
        {
            headers: { Authorization: `Bearer ${projectData.token}` }
        }
    );
    notifyUser({
        type: "success",
        message: `Projeto "${projectData.name}" foi criado com sucesso`
    })
    return response.data;
}

export async function getProfessorProjects(professorId) {
    const response = await api.get(`/projeto/?responsavel=${professorId}`);
    return response.data.map(project => ({
        id: project.id_projeto,
        name: project.nome,
        description: project.descricao,
        lab: project.laboratorio,
        slots: project.vagas,
        professor: project.responsavel,
        date: project.data_de_criacao,
    }))
}

export async function getProjectById(projectId) {
    const response = await api.get(`/projeto/${projectId}`);
    console.log("Get project by id returned: ", response.data)
    return {
        id: response.data.id_projeto,
        name: response.data.nome,
        description: response.data.descricao,
        lab: response.data.laboratorio,
        date: response.data.data_de_criacao,
        slots: response.data.vagas,
        professor: response.data.responsavel,
        candidatesAmount: response.data.quantidade_de_inscritos
    }
}