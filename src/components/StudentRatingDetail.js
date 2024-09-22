import SessionContext from "@/contexts/sessionContext";
import {
  deleteFeedbackStudent,
  getAllProfessors,
} from "@/lib/api/services/professor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";

const StudentRatingDetail = ({ data }) => {
  const session = useContext(SessionContext);
  const queryClient = useQueryClient();

  const allProfs = useQuery({
    queryKey: ["professors_data"],
    queryFn: () => getAllProfessors(),
  });

  const getProfessorName = (id) => {
    const prof = allProfs?.data?.find((prof) => prof.id == id);
    return prof ? prof.nome : "Desconhecido";
  };

  const mutation = useMutation({
    mutationFn: (data) =>
      deleteFeedbackStudent({
        ...data,
        token: session.data.token,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("visu_perfil_data");
      session.updateSessionData(data);
    },
  });
  if (allProfs.data == null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Lista de Avaliações:</h2>
      {data?.map((item, index) => (
        <div
          key={index}
          className="comentario-item border border-base-300 rounded-xl p-3 bg-base-300 flex justify-between items-center"
        >
          <div>
            <p>
              <strong>Comentário:</strong> {item.comentario}
            </p>
            <p>
              <strong>Professor:</strong> {getProfessorName(item.id_professor)}
            </p>
            <p>
              <strong>Tags:</strong>
            </p>
            <ul className="gap-1 mt-1 flex">
              {item.tags.map((tag) => (
                <li className="badge badge-primary text-xs" key={tag.id}>
                  {tag.nome}
                </li>
              ))}
            </ul>
          </div>
          {console.log(item.id_avaliacao)}
          {/* Conditionally render the trash icon button */}
          {item.id_professor == session.data.id && (
            <button
              onClick={() => {
                mutation.mutate({
                  id: item.id_avaliacao,
                });
              }}
              className="text-red-500 hover:text-red-700"
            >
              {/* SVG icon for trash */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default StudentRatingDetail;
