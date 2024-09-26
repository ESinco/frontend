"use client"
import { useParams } from "next/navigation";
import CandidateFilter from "@/components/CandidateFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SessionContext from "@/contexts/sessionContext";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getProjectById, approveStudents, rejectStudents } from "@/lib/api/services/project";
import Link from 'next/link'; // Importa o Link do Next.js

export default function CandidatesDetails() {
    const { projectId } = useParams();
    const queryClient = useQueryClient();
    const session = useContext(SessionContext)
    const [filteredStudents, setFilteredStudents] = useState([]); // candidates objects
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const [allSelected, setAllSelected] = useState(false)

    const project = useQuery({
        queryKey: ["professor_project", projectId],
        queryFn: () => getProjectById({
            projectId,
            token: session.data.token
        })
    })
    const rejectMutation = useMutation({
        mutationFn: () => rejectStudents({
            token: session.data.token,
            projectId,
            matriculas: [...selectedStudents],
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["professor_project", projectId])
        }
    })
    const approveMutation = useMutation({
        mutationFn: () => approveStudents({
            token: session.data.token,
            projectId,
            matriculas: [...selectedStudents],
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["professor_project", projectId])
        }
    })

    useEffect(() => {
        if (selectedStudents.size === 0) return;
        else {
            setSelectedStudents(new Set());
            setAllSelected(false);
        }
    }, [filteredStudents])

    useEffect(() => { console.log(filteredStudents) }, [filteredStudents])

    if (project.isLoading) return <LoadingSpinner />
    return (
        <main className="w-full">
            <section className="w-full flex items-center justify-center gap-5 p-3 my-5">
                <button
                    className="btn btn-error"
                    disabled={selectedStudents.size === 0}
                    onClick={rejectMutation.mutate}
                >Rejeitar Selecionados</button>
                <button
                    className="btn btn-success"
                    disabled={selectedStudents.size === 0}
                    onClick={approveMutation.mutate}
                >Aceitar Selecionados</button>
            </section>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={allSelected}
                                        onChange={e => {
                                            setAllSelected(prev => {
                                                if (prev) {
                                                    setSelectedStudents(new Set())
                                                } else {
                                                    setSelectedStudents(
                                                        new Set(
                                                            filteredStudents
                                                                .filter(candidate => candidate.status === null)
                                                                .map(candidate => candidate.aluno.matricula)
                                                        )
                                                    )
                                                }
                                                return !prev;
                                            })
                                        }}
                                    />
                                </label>
                            </th>
                            <th>Nome</th>
                            <th>Matricula</th>
                            <th>Email</th>
                            <th>CRA</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredStudents.map(candidate =>
                                <tr key={candidate.aluno.matricula}>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                disabled={candidate.status !== null}
                                                checked={selectedStudents.has(candidate.aluno.matricula)}
                                                onChange={_ => {
                                                    setSelectedStudents(prev => {
                                                        const newSet = new Set([...prev])
                                                        if (prev.has(candidate.aluno.matricula)) {
                                                            newSet.delete(candidate.aluno.matricula)
                                                        } else {
                                                            newSet.add(candidate.aluno.matricula)
                                                        }
                                                        return newSet;
                                                    })
                                                }}
                                            />
                                        </label>
                                    </th>
                                    <td>
                                        <Link href={`/professor/details/student/${candidate.aluno.matricula}`}>
                                            <button className="btn btn-link">
                                                {candidate.aluno.nome}
                                            </button>
                                        </Link>
                                    </td>
                                    <td>{candidate.aluno.matricula}</td>
                                    <td>{candidate.aluno.email}</td>
                                    <td>{candidate.aluno.cra ?? "N/A"}</td>
                                    <td>
                                        {candidate.status === null && <div className="badge badge-neutral">Pendente</div>}
                                        {candidate.status === true && <div className="badge badge-accent">Aprovado</div>}
                                        {candidate.status === false && <div className="badge badge-secondary">Reprovado</div>}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="fixed bottom-[20px] left-0 flex items-center justify-center w-full">
                <div className="w-full max_width px-5">
                    <CandidateFilter
                        projectId={projectId}
                        project={project}
                        emitFilteredData={setFilteredStudents}
                    />
                </div>
            </div>
        </main>
    )
}
