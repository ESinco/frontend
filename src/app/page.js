"use client"
import { redirect } from "next/navigation";
import CreateProject from "@/components/modals/CreateProject";

export default function Home() { 
    return (
        <CreateProject.Modal />
    )
}
