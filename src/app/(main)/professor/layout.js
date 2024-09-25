"use client"

import SessionContext from "@/contexts/sessionContext"
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react"

export default function ProfessorAppLayout({ children }) {
    const session = useContext(SessionContext);

    // Se usuario atualmente logado nao for professor, redirecione para perfil de aluno
    useEffect(() => {
        if(session.data && !session.data.isTeacher) redirect("/student/projects");
    }, [session.isLoading])

    return (
        <>
            { children }
        </>
    )
}