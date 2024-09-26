"use client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState, useContext } from "react";
import { getFilterListById, getProjectById, removeListById, saveNewList } from "@/lib/api/services/project";
import SessionContext from "@/contexts/sessionContext";
import { useMutation } from "@tanstack/react-query";

function filterByEveryKey(candidates, input) {
    // Filter every key in the student object in search of input value
    const dicionarioStatus = {
        pendente: "null",
        aceito: "true",
        rejeitado: "false"
    }
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate => {
            if(String(candidate.status) === dicionarioStatus[input]) return true;
            for(const key in candidate.aluno) {
                if(String(candidate.aluno[key]).toLowerCase().search(input.toLowerCase()) >= 0) return true;
            }
            return false;
        })
}

function filterByName(candidates, input) {
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate =>
            candidate.aluno.nome
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
        )
}


function filterByMatricula(candidates, input) {
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate =>
            candidate.aluno.matricula
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
        )
}
function filterByEmail(candidates, input) {
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate =>
            candidate.aluno.email
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
        )
}

function filterByStatus(candidates, input) {
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate =>
            String(candidate.status)
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
        )
}

function filterByCra(candidates, input) {
    if(input.length === 0) return candidates;
    return candidates
        .filter(candidate => 
            candidate.aluno.cra >= Number(input)
        )
}

export default function CandidateFilter({ emitFilteredData, project }) {
    const session = useContext(SessionContext)
    const [ isOpen, setIsOpen ] = useState(false);
    const [ genericFilter, setGenericFilter ] = useState("")
    const [ selectedList, setSelectedList ] = useState("")
    const [ listUsed, setListUsed ] = useState({})
    const [newListName, setNewListName] = useState("Lista sem nome")
    const [ filters, setFilters ] = useState({
        nome: "",
        matricula: "",
        email: "",
        status: "",
        cra: "",
    })

    const mutation = useMutation({
        mutationFn: saveNewList,
        onSuccess: () => {
            document.getElementById("name_modal").close();
            window.location.reload()
        }
    });

    const mutationGetList = useMutation({
        mutationFn: getFilterListById,
        onSuccess: data => {setListUsed(data)}
    });

    const mutationRemoveList = useMutation({
        mutationFn: removeListById,
        onSuccess: () => {
            window.location.reload()
        }
    });

    useEffect(() => {
        if(!project.data || project.isLoading) return;
        let filteredData = filterByName(project.data.candidates, filters.nome)
        filteredData = filterByEmail(filteredData, filters.email)
        filteredData = filterByMatricula(filteredData, filters.matricula)
        filteredData = filterByStatus(filteredData, filters.status)
        filteredData = filterByCra(filteredData, filters.cra)

        emitFilteredData(filteredData)
    }, [project.data, filters])

    useEffect(() => {
        if(!project.data || project.isLoading) return;
        let filteredData = filterByEveryKey(project.data.candidates, genericFilter)

        emitFilteredData(filteredData)
    }, [genericFilter])

    useEffect(() => {
        if(!project.data || project.isLoading || selectedList === "") return;
        mutationGetList.mutate({listId: project.data.lists[selectedList].id_lista, token: session.data.token})

    }, [selectedList])

    useEffect(() => {
        if(!project.data || project.isLoading || listUsed == {} || selectedList == "") return;
        let filteredData = filterByCra(project.data.candidates, listUsed.filtro_cra)

        emitFilteredData(filteredData)
    }, [listUsed, filters])

//    useEffect(() => {console.log(filters)}, [filters])

    return (
        <div className="collapse w-full p-2 search_shadow bg-neutral">

            <dialog id="name_modal" className="modal mt-20 items-start">
                <div className="modal-box p-5 flex flex-col items-center justify-between">
                    <h3 className=" text-lg text-center">Escolha um nome para a nova lista</h3>

                    <div className="modal-action w-full justify-normal">
                        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            mutation.mutate({
                                projectId: project.data.id,
                                token: session.data.token,
                                listName: newListName,
                                filters: {filtro_cra: filters.cra != "" ? filters.cra : 0}
                            })
                        }}
                        method="dialog"
                        className="flex flex-col gap-3 pt-4 w-full"
                        >
                            <div className="input input-bordered flex items-center gap-2">
                                <input
                                type="text"
                                className="grow"
                                onChange={(e) => setNewListName(e.target.value)
                                }
                                placeholder="Nome da lista"
                                />
                            </div>
                            <div className="gap-4 flex pt-10 ml-auto">
                                <button type="submit" className="btn btn-success ">
                                Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
            
            <input
                type="checkbox"
                className="peer"
                onClick={() => {
                    setIsOpen(prev => !prev);
                    setGenericFilter("")
                }}
            />
            <div className="collapse-title p-0 m-0 h-fit w-full text-center">
                { isOpen ? "Esconder busca avançada" : "Exibir busca avançada"}
            </div>

            <div className="collapse-content m-0 p-0 h-fit">
                <div className="join w-full">
                    <input
                        type="text"
                        className="grow input input-bordered"
                        placeholder="Nome"
                        disabled={!isOpen}
                        value={filters.nome}
                        onChange={e => setFilters(prev => ({...prev, nome: e.target.value}))}
                    />

                    <input
                        type="text"
                        className="grow input input-bordered"
                        placeholder="Email"
                        disabled={!isOpen}
                        value={filters.email}
                        onChange={e => setFilters(prev => ({...prev, email: e.target.value}))}
                    />
                </div>

                <div className="join w-full">
                    <input
                        type="number"
                        className="grow input input-bordered"
                        placeholder="Matricula"
                        disabled={!isOpen}
                        value={filters.matricula}
                        onChange={e => setFilters(prev => ({...prev, matricula: e.target.value}))}
                    />

                    <input
                        type="number"
                        className="grow input input-bordered"
                        placeholder="CRA"
                        disabled={!isOpen}
                        value={filters.cra}
                        onChange={e => setFilters(prev => ({...prev, cra: e.target.value}))}
                    />

                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={filters.status}
                        onChange={e => setFilters(prev => ({...prev, status: e.target.value}))}
                    >
                        <option value="">Status</option>
                        <option value="null">Pendente</option>
                        <option value="true">Aprovado</option>
                        <option value="false">Rejeitado</option>
                    </select>
                </div>

                <div className="flex align-end justify-end mb-4 gap-2 w-full">

                <select
                    className="select select-bordered w-full"
                    value={selectedList}
                    disabled={!isOpen}
                    onChange={e => setSelectedList(e.target.value)}
                >
                    <option value="">Listar todos alunos</option>
                    {project.data?.lists.map((list, index) => (
                        <option value={index}>{list.titulo}</option>
                    ))}
                </select>

                <button className="btn btn-m"
                        disabled={!isOpen}
                        onClick={() => document.getElementById("name_modal").showModal()}
                >
                    Criar nova lista utilizando os filtros</button>
                <button className="btn btn-m"
                        disabled={!isOpen}
                        onClick={() => mutationRemoveList.mutate({listId: listUsed.id_lista, token: session.data.token})}
                >
                    Excluir lista selecionada</button>
                </div>
            </div>

            <search className="flex items-center justify-center">
                <search className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder=""
                        disabled={isOpen}
                        value={genericFilter}
                        onChange={e => setGenericFilter(e.target.value)}
                    />
                    <p>Filtro</p>
                </search>
            </search>
        </div>
    )
}