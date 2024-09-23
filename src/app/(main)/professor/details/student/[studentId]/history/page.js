"use client";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";
import PdfRenderer from "@/components/PdfRenderer";
import { getHistory, getUserHistory } from "@/lib/api/services/user";
import { useParams, useRouter } from "next/navigation";

export default function HistoryPage() {
  const { studentId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formDataFile, setFormDataFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const session = useContext(SessionContext);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["history_data"],
    queryFn: () => getUserHistory(session.data.token, studentId),
  });

  // const query = useQuery({
  //   queryKey: ["data"],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `http://localhost:8000/historico/${sessionMatriculaDummy}`
  //     );
  //     const parsedData = await response.json();
  //     return parsedData;
  //   },
  // });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:8000/aluno/historico/importar/",
        {
          aluno: session.data.matricula,
          historico_pdf: selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.data.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history_data"] });
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const formData = new FormData();
    formData.append("aluno", session.data.matricula);
    formData.append("historico_pdf", selectedFile);
    setFormDataFile(formData);
  };

  if (!session.data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex justify-center items-center gap-3 flex-col mt-4 w-full p-3 pb-6">
      <btn
        className="btn btn-primary btn-xs ml-auto"
        onClick={() => router.push(`/professor/details/student/${studentId}`)}
      >
        Perfil Aluno
      </btn>
      <div className="flex w-11/12 justify-center gap-2">
        <h1 className="mb-2 text-2xl ml-3">Histórico</h1>
      </div>
      {!isPending && !isError ? <PdfRenderer pdfData={data} /> : null}

      {/* <div className="pdf-download">
      <a href={} download={pdfName} target="_blank" rel="noopener noreferrer">
        Click here to download the PDF
      </a>
    </div> */}
    </div>
  );
}
