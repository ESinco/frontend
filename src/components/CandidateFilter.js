"use client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState, useContext } from "react";
import { getProjectById } from "@/lib/api/services/project";
import SessionContext from "@/contexts/sessionContext";

function filterByName(candidates, input) {
    return candidates
        .filter(candidate =>
            candidate.name
                .toLowerCase()
                .search(input.toLowerCase()) >= 0
        )
}

function filterByEveryKey(candidates, input) {
    // Filter every key in the student object in search of input value
    return candidates
        .filter(candidate => {
            for(const key in candidate) {
                if(String(candidate[key]).toLowerCase().search(input.toLowerCase()) >= 0) return true; 
            }
            return false;
        })
}

export default function CandidateFilter({ emitFilteredData, projectId }) {
    const [ isOpen, setIsOpen ] = useState(false)
    const session = useContext(SessionContext)
    const [ currentFilteredData, setCurrentFilteredData ] = useState([])
    const project = useQuery({
        queryKey: [ "professor_project", projectId ],
        queryFn: () => getProjectById({
            projectId,
            token: session.data.token
        })
    })

    useEffect(() => { console.log(project.data) }, [project.isLoading])

    return (
        <div className="collapse w-full p-2 search_shadow bg-neutral">
            <input type="checkbox" className="peer" onClick={() => setIsOpen(prev => !prev)} />
            <div className="collapse-title p-0 m-0 h-fit w-full text-center">
                { isOpen ? "Esconder busca avançada" : "Exibir busca avançada"}
            </div>

            <div className="collapse-content m-0 p-0 h-fit">
                <p>hello</p>
            </div>

            <search className="flex items-center justify-center">
                <search className="input input-bordered flex items-center gap-2 w-full">
                    <input
                        type="text"
                        className="grow"
                        placeholder=""
                        disabled={isOpen}
                    />
                    <button className="btn btn-sm">Aplicar filtro</button>
                </search>
            </search>
        </div>
    )
}