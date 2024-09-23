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

export async function getStudentData(matricula) {
  const response = await api.get(`/aluno/${matricula}`);
  return response.data;
}

export async function getVisuPerfil(token, matricula) {
  const response = await api.get(`/aluno/visualizar_perfil/${matricula}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserHistory(token, matricula) {
  try {
    const response = await api.get(`/aluno/historico/${matricula}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/pdf",
      },
    });

    return response;
  } catch (error) {
    notifyUser({
      type: "error",
      message: "Histórico não encontrado!",
    });
    console.error(error);
  }
}

export async function editStudent(data) {
  const response = await api
    .put(
      "/aluno/editar_perfil/",
      {
        ...data,
        nome: data.nome, // Nome permanece o mesmo
        curriculo: data.curriculo,
        email: data.email, // Email pode mudar ou não
        github: data.github, // GitHub pode ser atualizado
        linkedin: data.linkedin, // LinkedIn pode ser atualizado
        experiencias: data.experiencias,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
    .then((response) => {
      notifyUser({
        type: "success",
        message: "Informações atualizadas com sucesso!",
      });
      return response;
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
