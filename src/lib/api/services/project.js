import { notifyUser } from "@/lib/adapters/notifier";
import api from "..";

export async function createProject(projectData) {
    const response = await api.post("/projeto/cadastrar/", {
        ...projectData,
        nome: projectData.name,
        descricao: projectData.description,
        dono: projectData.lab,
        data_de_criacao: Date.now(),
        vagas: 5,
        responsavel: 3 // id_professor
    });
    notifyUser({
        type: "success",
        message: `Projeto "${projectData.name}" foi criado com sucesso`
    })
    return response.data;
}