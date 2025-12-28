import React, { useState } from 'react';
import { Theme } from '../../types';
import { Logo } from '../ui/Logo';
import { API_ENDPOINTS } from '../../utils/api';
import { Lock, ArrowRight, AlertCircle, Mail, RefreshCw, CheckCircle } from 'lucide-react';

interface LoginProps {
    theme: Theme;
    onLogin: (password: string) => void;
}

export const AdminLogin: React.FC<LoginProps> = ({ theme, onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotMsg, setForgotMsg] = useState<string | null>(null);

    const isDark = theme === 'dark';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.trim()) {
            onLogin(password);
        } else {
            setError(true);
        }
    };

    const handleForgotPassword = async () => {
        setForgotLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.ADMIN_FORGOT_PASSWORD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            if (result.success) {
                setForgotMsg(result.message);
                setTimeout(() => setForgotMsg(null), 10000);
            } else {
                setForgotMsg(`Error: ${result.message}`);
                setTimeout(() => setForgotMsg(null), 10000);
            }
        } catch (err) {
            setForgotMsg('Error: Could not connect to the authentication server.');
            setTimeout(() => setForgotMsg(null), 10000);
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className={`w-full max-w-md p-10 rounded-[2.5rem] border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                <div className="text-center mb-10">
                    <div className="inline-flex p-4 bg-brand-primary/10 rounded-2xl mb-6">
                        <Logo theme={theme} className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-2">Management Console</h1>
                    <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Enter your password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-3 px-1">
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                Admin Password
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[10px] font-black uppercase tracking-tighter text-brand-primary hover:underline transition-all flex items-center gap-1"
                                disabled={forgotLoading}
                            >
                                {forgotLoading ? <RefreshCw size={10} className="animate-spin" /> : <Mail size={10} />}
                                Forgot Password?
                            </button>
                        </div>

                        <div className="relative group">
                            <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-slate-400 group-focus-within:text-brand-primary'}`}>
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                placeholder="••••••••••••"
                                className={`w-full pl-14 pr-6 py-5 rounded-2xl text-sm font-bold transition-all outline-none border ${isDark
                                    ? 'bg-slate-950 border-slate-800 focus:border-brand-primary'
                                    : 'bg-white border-slate-200 focus:border-brand-primary shadow-inner'
                                    } ${error ? 'border-red-500 bg-red-500/5' : ''}`}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 mt-3 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={14} />
                                <span>Please enter your password</span>
                            </div>
                        )}

                        {forgotMsg && (
                            <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle size={18} className="text-green-500 shrink-0" />
                                <p className="text-[11px] font-bold text-green-600 dark:text-green-400 leading-relaxed">
                                    {forgotMsg}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-3 group"
                    >
                        Enter Console
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a href="/" className={`block text-center text-xs font-bold opacity-40 hover:opacity-100 transition-opacity`}>
                        Return to Website
                    </a>
                </form>
            </div>
        </div>
    );
};
