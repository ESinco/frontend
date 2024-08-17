"use client"
import SignupValidationPassword from '@/components/SignupValidationPassword';
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [matricula, setMatricula] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="flex-col flex items-center justify-center p-3 min-h-full">
            <h1 className="text-5xl font-bold p-6">ProjetIn</h1>
            <div className="card w-full max-w-sm shrink-0 custom_shadow">
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
                            <span className="label-text">Matricula</span>
                        </label>
                        <input
                            type="matricula"
                            className="input input-bordered"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
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
    );
}