import api from "@/lib/api";
import { notifyError, notifyUser } from "@/lib/adapters/notifier";

export async function registerUser(data) {
    try {
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
    } catch(error) {
        notifyUser({
            type: "error",
            message: "Erro ao fazer cadastro, tente novamente..." 
        })
        notifyError(error);
        throw error;
    }
}