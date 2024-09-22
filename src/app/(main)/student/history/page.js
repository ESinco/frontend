"use client";
import HistoryTable from "@/components/HistoryTable";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";

export default function HistoryPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const queryClient = useQueryClient();

  const session = useContext(SessionContext);

  const fetchFileData = async () => {
    const response = await axios.get(
      `http://localhost:8000/aluno/historico/${session.data.matricula}`,
      {
        headers: {
          Authorization: `Bearer ${session.data.token}`,
        },
      }
    );

    // Axios already parses the response as JSON, so no need to use `response.json()`
    const parsedData = response.data;
    return parsedData;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchFileData,
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
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const formData = new FormData();
    formData.append("aluno", session.data.matricula);
    formData.append("historico_pdf", selectedFile);
    setFormDataFile(formData);
  };

  useEffect(() => {
    console.log("hist" + data);
  }, [data]);

  return (
    <div className="flex justify-center items-center gap-3 flex-col mt-10 w-full p-3 pb-6">
      <h1 className="mb-10 text-2xl">Histórico</h1>
      {!isPending && !isError ? <HistoryTable historyData={data} /> : null}

      {/* <div className="pdf-download">
      <a href={} download={pdfName} target="_blank" rel="noopener noreferrer">
        Click here to download the PDF
      </a>
    </div> */}

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mt-5 file-input file-input-bordered file-input-accent w-full max-w-xs"
      />
      {selectedFile ? (
        <button className="btn btn-success" onClick={mutation.mutate}>
          ADICIONAR
        </button>
      ) : null}
    </div>
  );
}
