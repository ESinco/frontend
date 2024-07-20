"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow"
import {
    useQueryClient,
    useQuery,
    useMutation
} from "@tanstack/react-query"

export default function Table() {
    const [ name, setName ] = useState("");
    const [ age, setAge ] = useState("");
    const queryClient = useQueryClient();
    const query = useQuery(
        {
            queryKey: ['data'],
            queryFn: async () => {
                const response = await fetch("http://localhost:3333/data", {
                    method: "GET"
                })
                const parsedData = await response.json();
                console.log(parsedData);
                return parsedData
            }
        }
    )

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post("http://localhost:3333/data", {
                name,
                age
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['data'] })
        },
    })

    useEffect(() => {

    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        query.data?.map(
                            (elem, index) => <TableRow key={elem?.name} number={index} name={elem?.name} age={elem?.age}/>
                        )
                    }
                </tbody>
            </table>
            <input 
                type="text"
                placeholder="Digite seu nome"
                className="input"
                onChange={e => setName(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Digite sua idade"
                className="input"
                onChange={e => setAge(e.target.value)}
            />
            <button 
                className="btn btn-success"
                onClick={mutation.mutate}
            >ADICIONAR
            </button>
        </div>
    )
}
