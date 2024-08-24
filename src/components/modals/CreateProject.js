import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "@/lib/api/services/project";
import LoadingSpinner from "../LoadingSpinner";
import { useContext } from "react/cjs/react.production.min";
import SessionContext from "@/contexts/sessionContext";

function open() {
    return document.getElementById('create_project_modal').showModal();
}

function Modal() {
    const { session } = useContext(SessionContext)
    const [ data, setData ] = useState({
        name: "",
        lab: "",
        slots: 0, //quantidade de vagas abertas
        description: "",
        desiredSkills: []
    })
    const mutation = useMutation({
        mutationFn: createProject,
    })

    function updateData(key, value) {
        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
            <>
                <button className="btn" onClick={open}>open modal</button>
                <dialog id="create_project_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {   /* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-xl text-white">Editar projeto</h3>

                        <form
                            className="w-full flex flex-col align-center justify-center gap-3"
                            onSubmit={e => {
                                e.preventDefault();
                                mutation.mutate(data);
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
                                    onChange={e => updateData("description", e.target.value)}/>
                            </label>

                            <input
                                className="btn btn-primary"
                                type="submit"
                                value={mutation.isLoading ? <LoadingSpinner /> : "Salvar"} />
                        </form>
                    </div>
                </dialog>
            </>
    )
}

const CreateProject = {
    open,
    Modal
}

export default CreateProject;