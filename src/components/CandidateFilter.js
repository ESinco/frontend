"use client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState, useContext } from "react";
import { getProjectById } from "@/lib/api/services/project";
import SessionContext from "@/contexts/sessionContext";

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

export default function CandidateFilter({ emitFilteredData, project }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ genericFilter, setGenericFilter ] = useState("")
    const [ filters, setFilters ] = useState({
        nome: "",
        matricula: "",
        email: "",
        status: "",
        cra: "",
    })

    useEffect(() => {
        if(!project.data || project.isLoading) return;
        let filteredData = filterByName(project.data.candidates, filters.nome)
        filteredData = filterByEmail(filteredData, filters.email)
        filteredData = filterByMatricula(filteredData, filters.matricula)
        filteredData = filterByStatus(filteredData, filters.status)
        emitFilteredData(filteredData)
    }, [project.isLoading, filters])

    useEffect(() => {
        if(!project.data || project.isLoading) return;
        const filteredData = filterByEveryKey(project.data.candidates, genericFilter)
        emitFilteredData(filteredData)
    }, [genericFilter])

//    useEffect(() => {console.log(filters)}, [filters])

    return (
        <div className="collapse w-full p-2 search_shadow bg-neutral">
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
                        type="text"
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
                    <button className="btn btn-xs">Aplicar filtro</button>
                </search>
            </search>
        </div>
    )
}