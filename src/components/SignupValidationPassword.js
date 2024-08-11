"use client"
import { useState } from 'react';


export default function SignupValidationPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validatePasswords = (newPassword, newConfirmPassword) => {
        if (newPassword.length < 4) {
            setError('A senha deve ter pelo menos 4 caracteres');
        } else if (newPassword !== newConfirmPassword) {
            setError('As senhas não coincidem');
        } else {
            setError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePasswords(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        validatePasswords(password, newConfirmPassword);
    };

    return (
        <div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary-content">Senha</span>
                </label>
                <input type="password" placeholder="" className="input input-bordered border-primary-content bg-[#1D232A]" value={password} onChange={handlePasswordChange} required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary-content">Confirme sua senha</span>
                </label>
                <input type="password" placeholder="" className="input input-bordered border-primary-content bg-[#1D232A]" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                {error && <span className="text-red-500" style={{ fontSize: '12px' }}>{error}</span>}
            </div>
        </div>
    );
}