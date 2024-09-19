"use client"
import { useParams } from "next/navigation";
import CandidateFilter from "@/components/CandidateFilter";

export default function CandidatesDetails() {
    const { projectId } = useParams();

    return (
        <div>
            {projectId}
            <CandidateFilter projectId={projectId}/>
        </div>
    ) 
}