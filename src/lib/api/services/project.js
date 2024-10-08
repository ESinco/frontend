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

export async function importProject({formData, token}) {
    const response = await api.post(
        "/projeto/cadastrar/csv/",
        formData,
        {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
        }
    );
    notifyUser({
        type: "success",
        message: "Projeto importado com sucesso!",
    });
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

export async function getProfessorProjects(professorId, token) {
    const response = await api.get(`/projeto/professor?responsavel=${professorId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
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
        slots: response.data.vagas,
        professor: response.data.responsavel,
        candidatesAmount: response.data.quantidade_de_inscritos,
        skills: response.data.habilidades,
        candidates: response.data.candidatos,
        lists: response.data.listas_com_filtros,
        colaboradores: response.data.colaboradores
    }
}

export async function getApplications(token) {
    const response = await api.get(`/projeto/aluno`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log("RAW RESPONSE: ")
    console.log(response.data)
    return response.data.map(project => ({
        id: project.id_projeto,
        name: project.nome,
        description: project.descricao,
        lab: project.laboratorio,
        date: project.data_de_criacao,
        slots: project.vagas,
        professor: project.responsavel,
        skills: project.habilidades,
        status: project.status,
    }));
}

export async function getApplicationById(token, projectId) {
    const response = await api.get(`/projeto/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log("OLHE AQUI MEU AMIGO")
    console.log(response.data)
    return {
        id: response.data.id_projeto,
        name: response.data.nome,
        description: response.data.descricao,
        lab: response.data.laboratorio,
        date: response.data.data_de_criacao,
        slots: response.data.vagas,
        professor: response.data.responsavel,
        candidatesAmount: response.data.quantidade_de_inscritos,
        skills: response.data.habilidades,
        status: response.data.status
    }
}

export async function getAllProjects(token) {
    const response = await api.get("/projeto", {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.map(project => ({
        id: project.id_projeto,
        name: project.nome,
        description: project.descricao,
        lab: project.laboratorio,
        date: project.data_de_criacao,
        slots: project.vagas,
        professor: project.responsavel,
        skills: project.habilidades,
    }))
}

export async function approveStudents({ token, matriculas, projectId }) {
    console.log("APPROVING")
    console.log({ token, matriculas, projectId })
    const response = await Promise.all(matriculas.map(matricula => 
        api.post(
            `/projeto/${projectId}/aluno/${matricula}/`,
            {
                status: true,
                enviar_email: false,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
    ))
    console.log("Aprove student response data: ", response.data)
    return response.data;
}

export async function rejectStudents({ token, matriculas, projectId }) {
    const response = await Promise.all(matriculas.map(matricula => 
        api.post(
            `/projeto/${projectId}/aluno/${matricula}/`,
            {
                status: false,
                enviar_email: false,
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
    ))
    console.log("Aprove student response data: ", response.data)
    return response.data;
}

export async function applyInProject({ projectId, token }) {
    const response = await api.post(`/aluno/interesse_projeto/${projectId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data;
}

export async function disApplyInProject({ projectId, token }) {
    const response = await api.delete(`/aluno/retirar_interesse_projeto/${projectId}/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function adicionarColaborador({ projectId, colaborador, token }) {
    const response = await api.post(
        `/projeto/cadastrar_colaborador/${projectId}/${colaborador}/`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    notifyUser({
        type: "success",
        message: "Colaborador adicionado com sucesso!",
    });
    return response.data;
}

export async function saveNewList({ projectId, token, filters, listName }) {
    const response = await api.post(
        `/projeto/cadastrar-lista/`, 
        {
            id_projeto: projectId,
            titulo: listName,
            ...filters
        }, 
        {
            headers: { Authorization: `Bearer ${token}` }
        }   
    )

    return response.data;
}

export async function getFilterListById({ listId, token }) {
    const response = await api.get(`projeto/lista/${listId}/`, {
            headers: { Authorization: `Bearer ${token}` }
    })
    return response.data;
}

export async function removeListById({ listId, token }) {
    const response = await api.delete(`projeto/lista/${listId}/deletar`, {
            headers: { Authorization: `Bearer ${token}` }
    })
    return response.data;
}

