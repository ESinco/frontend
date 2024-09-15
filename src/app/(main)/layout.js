"use client"
import { useContext, useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MainAppLayout({ children }) {
    const session = useContext(SessionContext);

    // To prevent main app access by unlogged users 
     useEffect(() => {
        if(session.isLoading) return;
        if(session.isError || !session.data) redirect("/login");
        if(session.data.isTeacher) redirect("/professor/profile")
    }, [session.isLoading])

    if(session.isLoading) return <LoadingSpinner />
    return (
        <>
            <main className="flex justify-center w-full items-center mt-[64px]">
                {children}
            </main>
            <Navbar />
        </>
    )
}