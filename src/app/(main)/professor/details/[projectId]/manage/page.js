"use client"
import { useParams } from "next/navigation";

export default function CandidatesDetails() {
    const { projectId } = useParams();

    return (
        <div>
            {projectId}
        </div>
    )
}