"use client"

import SignupValidationPassword from '@/components/SignupValidationPassword';
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [siape, setSiape] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex-col flex items-center justify-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">ProjetIn</h1>
                </div>
                <div className="card w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nome Completo</span>
                            </label>
                            <input
                                type="nome"
                                className="input input-bordered"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">SIAPE</span>
                            </label>
                            <input
                                type="siape"
                                className="input input-bordered"
                                value={siape}
                                onChange={e => setSiape(e.target.value)}
                                required />
                        </div>
                        <SignupValidationPassword password={password} setPassword={setPassword} />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Cadastre-se</button>
                        </div>
                        <label className="flex justify-center w-full p-3">
                            <Link
                                href="/login"
                                className="label-text-alt link link-hover"
                            >Já possui conta ? Entre</Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
}