import { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/lib/api/services/project";
import LoadingSpinner from "../LoadingSpinner";
import SessionContext from "@/contexts/sessionContext";

const MODAL_ID = 'edit_project_modal';

function open() {
    return document.getElementById(MODAL_ID).showModal();
}

function close() {
    return document.getElementById(MODAL_ID).close();
}

function Modal({ editData }) {
    const session = useContext(SessionContext);
    const queryClient = useQueryClient();
    const [ data, setData ] = useState({
        id: editData.id,
        name: editData.name,
        lab: editData.lab,
        slots: editData.slots, //quantidade de vagas abertas
        description: editData.description,
    })
    const mutation = useMutation({
        mutationFn: (data) => updateProject({
            ...data,
            responsavel: session.data.id,
            token: session.data.token
        }),
        onSuccess: () => {
            queryClient.invalidateQueries("professor_projects");
            close();
        },
    })

    useEffect(() => {
        setData({ ...editData })
    }, [editData.id])

    function updateData(key, value) {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <dialog id={MODAL_ID} className="modal">
            <div className="modal-box">
                <form method="dialog">
                {   /* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-xl text-white">{`Editar Projeto #${editData.id}`}</h3>

                <form
                    className="w-full flex flex-col align-center justify-center gap-3"
                    onSubmit={e => {
                        e.preventDefault();
                        mutation.mutate({
                            ...data,
                            responsible: session.data.id
                        });
                    }}
                >
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Nome</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            required
                            value={data.name ?? ""}
                            onChange={e => updateData("name", e.target.value)}/>
                    </label>


                    <div className="flex flex-row gap-2">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Laboratório</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                required
                                value={data.lab ?? ""}
                                onChange={e => updateData("lab", e.target.value)}/>
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Vagas</span>
                            </div>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                required
                                value={data.slots ?? ""}
                                onChange={e => updateData("slots", e.target.value)}/>
                        </label>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Descrição</span>
                        </div>
                        <textarea 
                            type="text"
                            className="textarea textarea-bordered w-full"
                            required
                            value={data.description}
                            onChange={e => updateData("description", e.target.value)}/>
                    </label>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >{mutation.isLoading ? <LoadingSpinner /> : "Salvar"}</button>
                </form>
            </div>
        </dialog>
    )
}

const EditProject = {
    open,
    Modal
}

export default EditProject;