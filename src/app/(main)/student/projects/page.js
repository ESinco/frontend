"use client"

import SessionContext from "@/contexts/sessionContext"
import { getAllProjects } from "@/lib/api/services/project"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import StudentProjectCard from "@/components/StudentProjectCard"

export default function AvailableProjects() {
    const [ searchString, setSearchString ] = useState("");
    const session = useContext(SessionContext)
    const projects = useQuery({
        queryKey: ['all_projects'],
        queryFn: () => getAllProjects(session.data.token)
    })

    useEffect(() => {
        console.log(projects.data)
    }, [projects.isLoading])

    return (
        <main>
            <h1 className="text-lg w-full text-center mt-10 mb-10">Projetos</h1>
            <div className="max_width flex flex-col items-center justify-center gap-5">
                <search className="input input-bordered flex items-center gap-2 w-full rounded-full search_shadow">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Buscar"
                        values={searchString}
                        onChange={e => setSearchString(e.target.value)}
                    />
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

                </search>
                {
                    projects.data?.map(project => <StudentProjectCard key={project.id} {...project} />)
                }
            </div>
        </main>
    )
}