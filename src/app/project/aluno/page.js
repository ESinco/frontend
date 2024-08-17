"use client"

import Navbar from "@/components/NavBar";
import { useState } from 'react';


export default function projectList() {

    const [buscaProjeto, setBuscaProjeto] = useState("")

    return (
        <div>
            <Navbar />
            <h1 className = "text-center justify-center"> Projetos </h1>

            <div className="flex justify-center mt-5">
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={buscaProjeto}
                        onChange={e => setBuscaProjeto(e.target.value)}
                        className="pl-10 pr-20 py-2 rounded-full  focus:outline-none focus:ring shadow-lg"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            

        </div>
    )
}