"use client"
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    return (
        <div className="flex-col flex items-center justify-center p-3 min-h-full">
            <h1 className="text-5xl font-bold mb-6">{process.env.NEXT_PUBLIC_APP_PRETTY_NAME}</h1>
            <div className="card w-full max-w-sm shrink-0 custom_shadow">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Senha</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label className="flex p-1">
                            <Link
                                href="#"
                                className="label-text-alt link link-hover"
                            >Esqueceu sua senha?</Link >
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <label className="flex justify-center w-full p-4">
                        <Link
                            href="/signup/aluno"
                            className=" label-text-alt link link-hover"
                        >Não possui conta ? Cadastre-se</Link>
                    </label>
                </form>
            </div>
        </div>
    );
}