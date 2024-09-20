import SessionContext from "@/contexts/sessionContext";
import { getHabilidadesData, getInteressesData } from "@/lib/api/services/tags";
import { editStudent } from "@/lib/api/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function SkillsModal({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState("");
  const [groupValue, setGroupValue] = useState("");

  const session = useContext(SessionContext);
  const queryClient = useQueryClient();

  const [editStudentData, setEditStudentData] = useState({
    nome: session.data.nome, // Nome permanece o mesmo
    curriculo: session.data.curriculo || "",
    email: session.data.email || "", // Email pode mudar ou não
    github: session.data.github || "", // GitHub pode ser atualizado
    linkedin: session.data.linkedin || "", // LinkedIn pode ser atualizado
    habilidades: session.data.habilidades || [],
    experiencias: session.data.experiencias || [],
    interesses: session.data.interesses || [],
  });

  const skills = useQuery({
    queryKey: ["habilidades_data"],
    queryFn: () => getHabilidadesData(),
  });

  // POST NO USER COM ESSAS INFORMACOES
  const mutation = useMutation({
    mutationFn: (data) =>
      editStudent({
        ...data,
        token: session.data.token,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("visu_perfil_data");
      session.updateSessionData(data);
      onClose();
    },
  });

  const handleHabilidadesChange = (e) => {
    const nome = inputValue; // From the text input
    const grupo = groupValue; // From the select input

    setEditStudentData((prev) => ({
      ...prev,
      habilidades: [...prev.habilidades, nome],
    }));

    onClose();
  };

  return (
    <>
      <button
        className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer pb-1 w-10 h-10 rounded-full"
        onClick={() => document.getElementById("Skills").showModal()}
      >
        +
      </button>
      <dialog id={"Skills"} className="modal mt-20 items-start">
        <div className="modal-box p-5 flex flex-col items-center justify-between">
          <h3 className=" text-lg text-center">Adicionar Links Úteis</h3>

          <div className="modal-action w-full justify-normal flex ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(editStudentData);
              }}
              method="dialog"
              className="flex flex-col gap-3 pt-4 w-full "
            >
              <div className="flex flex-col h-full justify-between">
                {/* Select Input for Hard Skills / Soft Skills */}
                <select
                  value={JSON.stringify({
                    nome: inputValue,
                    grupo: groupValue,
                  })} // Reflect the selected skill object
                  onChange={(e) => {
                    const selectedSkill = JSON.parse(e.target.value); // Parse the JSON string back to an object
                    setInputValue(selectedSkill.nome); // Set nome
                    setGroupValue(selectedSkill.grupo); // Set grupo
                  }}
                  className="select select-bordered w-full max-w-xs mb-5"
                >
                  {skills?.data?.length > 0 ? (
                    skills.data.map((skill) => (
                      <>
                        <option key={skill.nome} value={JSON.stringify(skill)}>
                          {skill.nome} ({skill.grupo})
                        </option>
                      </>
                    ))
                  ) : (
                    <option disabled>Loading skills...</option>
                  )}
                </select>
                {/* Button to trigger the habilidades onChange */}
                <div className="flex flex-row justify-end gap-5">
                  <button onClick={onClose} className="btn-error btn">
                    Cancelar
                  </button>
                  <button
                    onClick={handleHabilidadesChange}
                    className="btn btn-success w-1/3"
                  >
                    Adicionar Habilidades
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
