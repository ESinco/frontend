import { notifyUser } from "@/lib/adapters/notifier";
import api from "..";

export async function createProject(projectData) {
    const response = await api.post(
        "/projeto/cadastrar/", 
        {
            ...projectData,
            nome: projectData.name,
            descricao: projectData.description,
            dono: projectData.lab,
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
    return response.data;
}