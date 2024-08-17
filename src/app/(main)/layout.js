import { useContext, useEffect } from "react";
import SessionContext from "@/contexts/sessionContext";
import { redirect } from "next/navigation";

export default function MainAppLayout({ children }) {
    const session = useContext(SessionContext);

    // To prevent main app access by unlogged users 
    useEffect(() => {
        if(session.isLoading) return;
        if(session.isError || !session.data) redirect("/login");
    }, [session.isLoading])

    return (
        <>
            <main className="flex justify-center w-full items-center mt-[64px]">
                {children}
            </main>
            <Navbar />
        </>
    )
}