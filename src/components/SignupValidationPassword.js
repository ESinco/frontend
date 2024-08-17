"use client"
import { useState } from 'react';


export default function SignupValidationPassword( {password, setPassword, error, setError}) {
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    <span className="label-text">Senha</span>
                </label>
                <input
                    type="password"
                    className="input input-bordered"
                    value={password}
                    onChange={handlePasswordChange}
                    required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirme sua senha</span>
                </label>
                <input
                    type="password"
                    className="input input-bordered"
                    value={confirmPassword} onChange={handleConfirmPasswordChange}
                    required />
                {error && <span className="text-error" style={{ fontSize: '12px' }}>{error}</span>}
            </div>
        </div>
    );
}