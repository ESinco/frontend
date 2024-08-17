import api from "@/lib/api";
import { notifyError, notifyUser } from "@/lib/adapters/notifier";

export async function registerStudent(data) {
    const response = await api.post("/aluno/cadastrar/", {
        ...data,
        nome: data.name,
        senha: data.password
    });
    notifyUser({
        type: "success",
        message: "Usuário cadastrado com sucesso!"
    })
    return response.data;
}

export async function registerProfessor(data) {
    const response = await api.post("/professor/cadastrar/", {
        ...data,
        nome: data.name,
        senha: data.password
    });
    notifyUser({
        type: "success",
        message: "Usuário cadastrado com sucesso!"
    })
    return response.data;
}