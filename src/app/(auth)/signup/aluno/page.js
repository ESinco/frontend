"use client"
import SignupValidationPassword from '@/components/SignupValidationPassword';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { registerStudent } from '@/lib/api/services/user';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [ error, setError ] = useState('A senha deve ter pelo menos 4 caracteres');
    const mutation = useMutation({
        mutationFn: registerStudent,
        onSuccess: () => { router.push("/login") }
    });
    const [ signupData, setSignupData ] = useState({
        name: "",
        email: "",
        matricula: "",
        password: ""
    });

    return (
        <div className="flex-col flex items-center justify-center p-3 min-h-full">
            <h1 className="text-5xl font-bold p-6">{process.env.NEXT_PUBLIC_APP_PRETTY_NAME}</h1>
            <div className="card w-full max-w-sm shrink-0 custom_shadow">
                <form
                    className="card-body"
                    onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate(signupData);
                    }}>
                        <div>
                            <Link
                                href="/signup/aluno"
                                className="btn btn btn-outline btn-primary btn-xs mr-3 cursor-pointer"
                            >Aluno</Link>
                            <Link
                                className="btn btn btn-outline btn-default btn-xs cursor-pointer"
                                href="/signup/professor"    
                            >Professor</Link>
                        </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nome Completo</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={signupData.name}
                            onChange={e => setSignupData(prev => ({...prev, name: e.target.value}))}
                            required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered"
                            value={signupData.email}
                            onChange={e => setSignupData(prev => ({...prev, email: e.target.value}))}
                            required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Matricula</span>
                        </label>
                        <input
                            type="text"
                            maxLength="9"
                            className="input input-bordered"
                            value={signupData.matricula}
                            onChange={e => setSignupData(prev => ({...prev, matricula: e.target.value}))}
                            required />
                    </div>
                    <SignupValidationPassword
                        password={signupData.password}
                        setPassword={(password) => {
                            setSignupData(prev => ({...prev, password}))
                        }}
                        error={error}
                        setError={setError}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary mt-6"
                        disabled={!!error.length}>
                            {mutation.isLoading ? <LoadingSpinner /> : "Cadastre-se"}
                        </button>
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