import SessionContext from "@/contexts/sessionContext";
import { getHabilidadesData, getInteressesData } from "@/lib/api/services/tags";
import { editStudent } from "@/lib/api/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

export default function InterestsModal({ userData }) {
  const [idValue, setIdValue] = useState("");

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
      queryClient.invalidateQueries("visu_perfil_data");
      session.updateSessionData(data);
      setEditStudentData((prev) => ({
        ...prev,
        interesses: session.data.interesses,
        habilidades: session.data.habilidades,
        experiencias: session.data.experiencias,
      }));
    },
  });

  const handleInteressesChange = (e) => {
    const id = idValue;

    setEditStudentData((prev) => ({
      ...prev,
      interesses: [...prev?.interesses?.map((interesse) => interesse?.id), id],
      habilidades: [...prev?.habilidades?.map((habilidade) => habilidade?.id)],
      experiencias: [
        ...prev?.experiencias?.map((experiencia) => experiencia?.id),
      ],
    }));

    document.getElementById("Interests").close();
  };

  useEffect(() => {
    setEditStudentData((prev) => ({
      ...prev,
      nome: userData?.nome, // Nome permanece o mesmo
      curriculo: userData?.curriculo || "",
      email: userData?.email || "", // Email pode mudar ou não
      github: userData?.github || "", // GitHub pode ser atualizado
      linkedin: userData?.linkedin || "", // LinkedIn pode ser atualizado
      interesses: userData?.interesses,
      habilidades: userData?.habilidades,
      experiencias: userData?.experiencias,
    }));
  }, [userData]);

  return (
    <>
      <button
        className="bg-slate-400 text-3xl text-black text-center duration-400 hover:bg-slate-300 transition-colors hover:cursor-pointer pb-1 w-10 h-10 rounded-full"
        onClick={() => document.getElementById("Interests").showModal()}
      >
        +
      </button>
      <dialog id={"Interests"} className="modal mt-20 items-start">
        <div className="modal-box p-5 flex flex-col items-center justify-between">
          <h3 className=" text-lg text-center">Adicionar Interesses</h3>

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
                <>
                  <select
                    value={idValue} // Bind to inputValue (skill name)
                    onChange={(e) => {
                      const selectedInterest = interesses.data.find(
                        (interesse) => interesse.id == e.target.value
                      );

                      setIdValue(selectedInterest.id); // Set id
                    }}
                    className="select select-bordered w-full max-w-xs mb-5"
                  >
                    <option value="" disabled>
                      Selecione um interesse
                    </option>
                    {interesses?.data?.length > 0 ? (
                      interesses.data.map((interesse) => (
                        <>
                          <option key={interesse.nome} value={interesse.id}>
                            {interesse.nome} - ({interesse.grupo})
                          </option>
                        </>
                      ))
                    ) : (
                      <option disabled>Carregando Interesses...</option>
                    )}
                  </select>
                  {/* Button to trigger the interesses onChange */}
                  <div className="flex flex-row justify-end gap-5">
                    <button
                      type="submit"
                      onClick={handleInteressesChange}
                      className="btn btn-success w-1/3"
                    >
                      Adicionar Interesse
                    </button>
                  </div>
                </>
              </div>
            </form>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-white">
                x
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
