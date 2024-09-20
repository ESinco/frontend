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
    const response = await api.put(
        `/projeto/${projectData.id}/editar/`, 
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
        candidatesAmount: project.quantidade_de_inscritos,
    }))
}

export async function getProjectById({ projectId, token }) {
    const response = await api.get(`/projeto/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        id: response.data.id_projeto,
        name: response.data.nome,
        description: response.data.descricao,
        lab: response.data.laboratorio,
        date: response.data.data_de_criacao,
        hab: response.data.habilidades,
        slots: response.data.vagas,
        professor: response.data.responsavel,
        candidatesAmount: response.data.quantidade_de_inscritos
    }
}


export async function getAllProjects() {
    const response = await api.get("projeto/");
    return response.data.map(project => ({
        id: project.id_projeto,
        name: project.nome,
        hab: project.habilidades,
        description: project.descricao,
        lab: project.laboratorio,
        date: project.data_de_criacao,
        slots: project.vagas,
        professor: project.responsavel,
        candidatesAmount: project.quantidade_de_inscritos
    }));
}

export async function interessarProject(id, token) {
    const response = await api.post(
        `aluno/interesse_projeto/${id}/`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
}

export async function getAllProjectsByAlunos({token}) {
    console.log(token)
    const response = await api.get('/projeto/aluno/',
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.map(project => ({
        id: project.id_projeto,
        name: project.nome,
        hab: project.habilidades,
        description: project.descricao,
        lab: project.laboratorio,
        date: project.data_de_criacao,
        slots: project.vagas,
        professor: project.responsavel,
        candidatesAmount: project.quantidade_de_inscritos
    }));
}