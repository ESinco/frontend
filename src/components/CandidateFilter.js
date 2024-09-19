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
        <div>
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
            </label>
        </div>
    )
}