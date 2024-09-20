import SessionContext from "@/contexts/sessionContext";
import { getHabilidadesData, getInteressesData } from "@/lib/api/services/tags";
import { editStudent } from "@/lib/api/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function ModalSkills({ isOpen, onClose, placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [groupValue, setGroupValue] = useState("Hard Skills");

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

  const interesses = useQuery({
    queryKey: ["interesses_data"],
    queryFn: () => getInteressesData(),
  });

  // POST NO USER COM ESSAS INFORMACOES
  const mutation = useMutation({
    mutationFn: (data) =>
      editStudent({
        ...data,
        token: session.data.token,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("student_data");
      onClose();
    },
  });

  const handleHabilidadesChange = (e) => {
    const nome = inputValue; // From the text input
    const grupo = groupValue; // From the select input

    setEditStudentData((prev) => ({
      ...prev,
      habilidades: [...prev.habilidades, { nome: nome, grupo: grupo }],
    }));

    onClose();
  };

  const handleInteressesChange = (e) => {
    const nome = inputValue; // From the text input
    const grupo = groupValue; // Fixed value for interesses

    setEditStudentData((prev) => ({
      ...prev,
      interesses: [...prev.interesses, { nome: nome, grupo: grupo }],
    }));
    onClose();
  };

  return (
    <>
      <button
        className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer pb-1 w-10 h-10 rounded-full"
        onClick={() => document.getElementById(placeholder).showModal()}
      >
        +
      </button>
      <dialog id={placeholder} className="modal mt-20 items-start">
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
              {/* <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
              </label> */}

              <div className="flex flex-col h-full justify-between">
                {placeholder === "Habilidades" ? (
                  <>
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
                            <option
                              key={skill.nome}
                              value={JSON.stringify(skill)}
                            >
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
                  </>
                ) : (
                  <>
                    <select
                      value={JSON.stringify({
                        nome: inputValue,
                        grupo: groupValue,
                      })} // Reflect the selected skill object
                      onChange={(e) => {
                        const selectedSkill = JSON.parse(e.target.value); // Parse the JSON string back to an object
                        setInputValue(selectedSkill.nome); // Set nome
                        setGroupValue(selectedSkill.gropo);
                      }}
                      className="select select-bordered w-full max-w-xs mb-5"
                    >
                      {interesses?.data?.length > 0 ? (
                        interesses.data.map((interesse) => (
                          <>
                            <option
                              key={interesse.nome}
                              value={JSON.stringify(interesse)}
                            >
                              {interesse.nome} ({interesse.grupo})
                            </option>
                          </>
                        ))
                      ) : (
                        <option disabled>Loading skills...</option>
                      )}
                    </select>
                    {/* Button to trigger the interesses onChange */}
                    <div className="flex flex-row justify-end gap-5">
                      <button onClick={onClose} className="btn-error btn">
                        Cancelar
                      </button>
                      <button
                        onClick={handleInteressesChange}
                        className="btn btn-success w-1/3"
                      >
                        Adicionar Interesse
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
