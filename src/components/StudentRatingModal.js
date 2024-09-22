import SessionContext from "@/contexts/sessionContext";
import { addFeedbackStudent } from "@/lib/api/services/professor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

export default function StudentRatingModal({ feedbacks, matAluno }) {
  const [comentario, setComentario] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState("");

  const session = useContext(SessionContext);
  const queryClient = useQueryClient();

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;

    if (selectedId && !tags.includes(selectedId)) {
      setTags([...tags, selectedId]); // Adiciona a tag ao array de tags
    }

    setSelectedFeedbackId(""); // Reseta o select após adicionar a tag
  };

  const mutation = useMutation({
    mutationFn: (data) =>
      addFeedbackStudent({
        ...data,
        token: session.data.token,
        matriculaAluno: matAluno,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("visu_perfil_data");
      setComentario("");
      setTags([]);
      document.getElementById("rating_modal").close();
    },
  });

  return (
    <>
      <button
        className="btn btn-warning btn-xs w-20 rounded-full"
        onClick={() => document.getElementById("rating_modal").showModal()}
      >
        Avaliar
      </button>
      <dialog id="rating_modal" className="modal mt-20 items-start">
        <div className="modal-box p-5 flex flex-col items-center justify-between">
          <h3 className=" text-lg text-center">Adicione seu Feedback!</h3>
          <div className="modal-action w-full justify-normal flex flex-col items-center">
            <form
              className="flex flex-col gap-1"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({
                  comentario: comentario,
                  tags: tags,
                });
              }}
            >
              {/* Input de texto para o comentário */}
              <div className="flex flex-col gap-2">
                <label className="label-text" htmlFor="comentario">
                  Comentário:
                </label>
                <textarea
                  type="text"
                  id="comentario"
                  value={comentario}
                  onChange={handleComentarioChange}
                  placeholder="Escreva seu comentário..."
                  className="textarea textarea-bordered"
                />
              </div>
              {/* Select dropdown */}
              {/* Select dropdown para selecionar tags */}
              <div className="flex flex-col gap-1">
                <label htmlFor="feedback-select">Selecione as Tags:</label>
                <select
                  id="feedback-select"
                  value={selectedFeedbackId}
                  onChange={handleSelectChange}
                  className="select select-bordered w-full max-w-xs mb-5"
                >
                  <option value="" disabled>
                    Selecione uma tag
                  </option>
                  {feedbacks.data?.map((feedback) => (
                    <option key={feedback.id} value={feedback.id}>
                      {feedback.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exibe as tags adicionadas */}
              <div className="flex flex-col gap-1">
                <h4>Tags Selecionadas:</h4>
                <ul className="flex gap-1">
                  {tags.map((tag, index) => (
                    <li className="badge badge-primary text-xs" key={index}>
                      {feedbacks.data?.find((fb) => fb.id == tag)?.nome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gap-4 flex pt-10 ml-auto">
                <button type="submit" className="btn btn-success ">
                  Confirmar
                </button>
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
