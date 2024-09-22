import SessionContext from "@/contexts/sessionContext";
import { editStudent } from "@/lib/api/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function ProfileModal({ aluno }) {
  const queryClient = useQueryClient();

  const session = useContext(SessionContext);

  const [editStudentData, setEditStudentData] = useState({
    nome: session.data.nome, // Nome permanece o mesmo
    curriculo: session.data.curriculo ?? "",
    email: session.data.email || "", // Email pode mudar ou não
    github: session.data.github || "", // GitHub pode ser atualizado
    linkedin: session.data?.linkedin, // LinkedIn pode ser atualizado
    habilidades: session.data.habilidades ?? [],
    experiencias: session.data.experiencias ?? [],
    interesses: session.data.interesses ?? [],
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
      document.getElementById("pfp_modal").close();
    },
  });

  useEffect(() => {
    setEditStudentData((prev) => ({
      nome: aluno?.nome, // Nome permanece o mesmo
      curriculo: aluno?.curriculo ?? "",
      email: aluno?.email || "", // Email pode mudar ou não
      github: aluno?.github || "", // GitHub podse ser atualizado
      linkedin: aluno?.linkedin, // LinkedIn pode ser atualizado
      habilidades: aluno?.habilidades.map((habilidade) => habilidade?.id),
      experiencias: aluno?.experiencias.map((experiencia) => experiencia?.id),
      interesses: aluno?.interesses.map((interesse) => interesse?.id),
    }));
  }, [aluno]);

  return (
    <>
      <button
        className="  hover:cursor-pointer "
        onClick={() => document.getElementById("pfp_modal").showModal()}
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
              fill="#ffffff"
            ></path>{" "}
          </g>
        </svg>
      </button>
      <dialog id="pfp_modal" className="modal mt-20 items-start">
        <div className="modal-box p-5 flex flex-col items-center justify-between">
          <h3 className=" text-lg text-center">Editar Perfil</h3>

          <div className="modal-action w-full justify-normal">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(editStudentData);
              }}
              method="dialog"
              className="flex flex-col gap-3  pt-4 w-full"
            >
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="text"
                  className="grow"
                  value={editStudentData.linkedin} // bug, o valor nao aparece no input quando eu vou atualizar
                  onChange={(e) =>
                    setEditStudentData((prev) => ({
                      ...prev,
                      linkedin: e.target.value,
                    }))
                  }
                  placeholder="Adicione seu Linkedin..."
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="text"
                  className="grow"
                  value={editStudentData.email}
                  onChange={(e) =>
                    setEditStudentData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Adicione seu Email..."
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                </svg>
                <input
                  type="text"
                  className="grow"
                  value={editStudentData.github}
                  onChange={(e) =>
                    setEditStudentData((prev) => ({
                      ...prev,
                      github: e.target.value,
                    }))
                  }
                  placeholder="Adicione seu Github..."
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-link-45deg"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  value={editStudentData.curriculo}
                  onChange={(e) =>
                    setEditStudentData((prev) => ({
                      ...prev,
                      curriculo: e.target.value,
                    }))
                  }
                  placeholder="Adicione o link para seu curriculo..."
                />
              </label>

              {/* if there is a button in form, it will close the modal */}
              <div className="gap-4 flex pt-10 ml-auto">
                <button type="submit" className="btn btn-success ">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
