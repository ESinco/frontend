import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adicionarColaborador } from "@/lib/api/services/project";
import LoadingSpinner from "../LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";

const MODAL_ID = 'adicionar_colaborador_modal';

function open() {
    return document.getElementById(MODAL_ID).showModal();
}

function close() {
    return document.getElementById(MODAL_ID).close();
}

function Modal({ projectId }) {
    const session = useContext(SessionContext);
    const queryClient = useQueryClient();
    const [ data, setData ] = useState({
        colaborador: "",
        projectId
    })
    const mutation = useMutation({
        mutationFn: (data) =>
            adicionarColaborador({
            ...data,
            token: session.data.token
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["professor_project", projectId.projectId]);
            close();
        },
        
    })

    return (
        <dialog id={MODAL_ID} className="modal">
            <div className="modal-box">
                <form method="dialog">
                {   /* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-xl text-white">Adicionar Colaborador</h3>

                <form
                    className="w-full flex flex-col align-center justify-center gap-3"
                    onSubmit={e => {
                        e.preventDefault();
                        mutation.mutate(data)
                    }}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered"
                            value={data.email}
                            onChange={e => setData(prev => ({...prev, colaborador: e.target.value}))}
                            required />
                    </div>

                    <input
                        className="btn btn-primary"
                        type="submit"
                        value={mutation.isLoading ? <LoadingSpinner /> : "Adicionar"} />
                </form>
            </div>
        </dialog>
    )
}

const AdicionarColaborador = {
    open,
    Modal
}

export default AdicionarColaborador;