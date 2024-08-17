"use client"
import SignupValidationPassword from '@/components/SignupValidationPassword';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerProfessor } from '@/lib/api/services/user';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [error, setError] = useState('A senha deve ter pelo menos 4 caracteres');
    const mutation = useMutation({
        mutationFn: registerProfessor,
        onSuccess: () => { router.push("/login") }
    });
    const [ signupData, setSignupData ] = useState({
        name: "",
        email: "",
        siape: "",
        password: "",
    })

    return (
        <div className="flex-col flex items-center justify-center p-3 pb-10 min-h-full">
            <h1 className="text-5xl font-bold p-6">{process.env.NEXT_PUBLIC_APP_PRETTY_NAME}</h1>
            <div className="card w-full max-w-sm shrink-0 custom_shadow">
                <form
                    className="card-body"
                    onSubmit={e => {
                        e.preventDefault();
                        mutation.mutate(signupData)
                    }}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nome Completo</span>
                        </label>
                        <input
                            type="nome"
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
                            <span className="label-text">SIAPE</span>
                        </label>
                        <input
                            type="siape"
                            className="input input-bordered"
                            value={signupData.siape}
                            onChange={e => setSignupData(prev => ({...prev, siape: e.target.value}))}
                            required />
                    </div>
                    <SignupValidationPassword
                        error={error}
                        setError={setError}
                        password={signupData.password}
                        setPassword={(password) => {
                            setSignupData(prev => ({ ...prev, password }))
                        }}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
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
    )
}