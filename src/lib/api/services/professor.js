import api from "@/lib/api";
import { notifyUser } from "@/lib/adapters/notifier";

export async function addFeedbackStudent(data) {
  const response = await api.post(
    `/professor/avaliar/${data.matriculaAluno}/`,
    {
      comentario: data.comentario,
      tags: data.tags,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  notifyUser({
    type: "success",
    message: "Usuário cadastrado com sucesso!",
  });
  return response;
}

export async function deleteFeedbackStudent(data) {
  console.log(data);
  const response = await api.delete(`/professor/retirar_avaliacao/${data}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  notifyUser({
    type: "success",
    message: "Avaliação deletada com sucesso!",
  });
  return response.data;
}

export async function getAllProfessors() {
  const response = await api.get("/professor/");
  return response.data;
}
