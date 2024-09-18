"use client"
import { useParams } from "next/navigation";

export default function StudentDetails() {
    const {studentId} = useParams();
    return (
        <div>
            {studentId}
        </div>
    )
}