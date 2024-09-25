"use client"
import LoadingSpinner from "@/components/LoadingSpinner"
import StudentProjectCard from "@/components/StudentProjectCard"
import SessionContext from "@/contexts/sessionContext"
import { getApplications } from "@/lib/api/services/project"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"

export default function ApplicationsPage() {
    console.log("INSIDE APPLICATIONS PAGE")
    const session = useContext(SessionContext)
    const applications = useQuery({
        queryKey: [ "applications" ],
        queryFn: () => getApplications(session.data.token)
    })

    useEffect(()=> {console.log("APUL data: ", applications.data)}, [applications.isLoading])

    if(applications.isLoading) return <LoadingSpinner />
    return (
        <main className="flex flex-col items-center justify-center gap-5 w-full max_width p-2">
            <h1 className="text-center py-5 text-lg">Minhas Candidaturas</h1>
            {
                applications.data?.map(project => <StudentProjectCard key={project.id} {...project} isCandidate={true} />)
            }
        </main>
    )
}