import api from "@/lib/api";
import { notifyUser } from "@/lib/adapters/notifier";
import { useContext } from "react";
import SessionContext from "@/contexts/sessionContext";

export async function getHabilidadesData() {
  const response = await api.get("/api/habilidades/");
  return response.data;
}

export async function getInteressesData() {
  const response = await api.get("api/interesses/");
  return response.data;
}

export async function getExperienciasData() {
  const response = await api.get("api/experiencias/");
  return response.data;
}
