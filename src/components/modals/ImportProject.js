import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importProject } from "@/lib/api/services/project";
import LoadingSpinner from "../LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";
import { notifyUser } from "@/lib/adapters/notifier";
import api from "@/lib/api";

const MODAL_ID = 'import_project_modal';

function open() {
    return document.getElementById(MODAL_ID).showModal();
}

function close() {
    return document.getElementById(MODAL_ID).close();
}

function Modal() {
    const session = useContext(SessionContext);
    const queryClient = useQueryClient();
    const [selectedFile, setSelectedFile] = useState(null);
    const mutation = useMutation({
        mutationFn: async () => { 
            if (!selectedFile) {
                notifyUser({
                    type: "error",
                    message: "Por favor, selecione um arquivo.",
            })
            return}

            const formData = new FormData();
            formData.append("file", selectedFile);
            importProject({
                formData : formData,
                token : session.data.token
            })
            },
            onSuccess: () => {
            queryClient.invalidateQueries("professor_projects")
            },
        })

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
      }
      
    return (
        <dialog id={MODAL_ID} className="modal">
            <div className="modal-box">
                <form method="dialog">
                {   /* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-xl text-white">Importar Projeto</h3>

                <form
                    className="w-full flex flex-col align-center justify-center gap-3"
                    onSubmit={e => {
                        e.preventDefault();
                        mutation.mutate();
                    }}
                >
                <div className="flex justify-center items-center gap-3 flex-col mt-4 w-full p-3 pb-6">
                    <div className="flex w-11/12 justify-center gap-2">
                        <h1 className="mb-2 text-2xl ml-3">Arquivo CSV</h1>
                    </div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="mt-5 file-input file-input-bordered file-input-accent w-full max-w-xs"
                    />    
                    </div>
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value={mutation.isLoading ? <LoadingSpinner /> : "Importar"} />
                </form>
            </div>
        </dialog>
    )
}

const ImportProject = {
    open,
    Modal,
}

export default ImportProject;