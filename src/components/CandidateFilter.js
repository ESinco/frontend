"use client"
import { useQuery } from "@tanstack/react-query"

export default function CandidateFilter({ emitFilteredData, projectId }) {
    const project = useQuery({
        queryKey: [ "professor_project", projecId ],
        queryFn: () => getProjectById(projectId)
    })

    return (
        <div>
            oi
        </div>
    )
}