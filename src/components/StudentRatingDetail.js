import SessionContext from "@/contexts/sessionContext";
import { getAllProfessors } from "@/lib/api/services/professor";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";

const StudentRatingDetail = ({ data }) => {
  const session = useContext(SessionContext);
  const allProfs = useQuery({
    queryKey: ["professors_data"],
    queryFn: () => getAllProfessors(),
  });

  const getProfessorName = (id) => {
    const prof = allProfs?.data?.find((prof) => prof.id == id);
    return prof ? prof.nome : "Desconhecido";
  };

  if (allProfs.data == null) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Lista de Avaliações:</h2>
      {data?.map((item, index) => (
        <div
          key={index}
          className="comentario-item border border-base-300 rounded-xl p-3 bg-base-300"
        >
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
      ))}
    </div>
  );
};

export default StudentRatingDetail;
