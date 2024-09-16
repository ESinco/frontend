import api from "@/lib/api";
import { notifyUser } from "@/lib/adapters/notifier";
import { useContext } from "react";
import SessionContext from "@/contexts/sessionContext";

export async function registerStudent(data) {
  const response = await api.post("/aluno/cadastrar/", {
    ...data,
    nome: data.name,
    senha: data.password,
  });
  notifyUser({
    type: "success",
    message: "Usuário cadastrado com sucesso!",
  });
  return response.data;
}

export async function editStudent(data, session) {
  const response = await api
    .put(
      "/aluno/editar_perfil/",
      {
        nome: data.nome, // Nome permanece o mesmo
        curriculo: data.curriculo,
        email: data.email, // Email pode mudar ou não
        github: data.github, // GitHub pode ser atualizado
        linkedin: data.linkedin, // LinkedIn pode ser atualizado
        habilidades: data.habilidades,
        experiencias: data.experiencias,
        interesses: data.interesses,
      },
      {
        headers: {
          Authorization: `Bearer ${session.data.token}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  return response.data;
}

export async function registerProfessor(data) {
  const response = await api.post("/professor/cadastrar/", {
    ...data,
    nome: data.name,
    senha: data.password,
  });
  notifyUser({
    type: "success",
    message: "Usuário cadastrado com sucesso!",
  });
  return response.data;
}

export async function logUser(data) {
  const response = await api.post("/api/login/", data);
  return response.data;
}
