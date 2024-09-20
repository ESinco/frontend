"use client"
import { useParams } from "next/navigation";
import CandidateFilter from "@/components/CandidateFilter";
import { useQuery } from "@tanstack/react-query";
import SessionContext from "@/contexts/sessionContext";
import { useContext } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CandidatesDetails() {
    const { projectId } = useParams();
    const session = useContext(SessionContext)
    const project = useQuery({
        queryKey: [ "professor_project", projectId ],
        queryFn: () => getProjectById({
            projectId,
            token: session.data.token
        })
    })

    if(project.isLoading) return <LoadingSpinner />
    return (
        <main className="w-full">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
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
                            
                        }
                    {/* row 1 */}
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                        alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Brice Swyre</div>
                                        <div className="text-sm opacity-50">China</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Carroll Group
                                <br />
                                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                            </td>
                            <td>Red</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="fixed bottom-[20px] left-0 flex items-center justify-center w-full">
                <div className="w-full max_width px-5">
                    <CandidateFilter projectId={projectId}/>
                </div>
            </div>
        </main>
    ) 
}