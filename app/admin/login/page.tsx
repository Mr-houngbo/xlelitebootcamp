'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import { Hexagon, Lock, Mail, ArrowRight, Zap } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (email !== adminEmail) {
        throw new Error("Accès non autorisé.");
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push('/admin/dashboard');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message === "Accès non autorisé." 
        ? "Cet identifiant n'a pas les droits d'administration." 
        : "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center relative overflow-hidden font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,240,240,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,240,0.8)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-white via-white/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[120px] opacity-70 animate-pulse"></div>
      </div>

      <div className="w-full max-w-lg relative z-10 px-4">
        {/* Header Icon */}
        <div className="flex justify-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="relative flex items-center justify-center w-24 h-24"
          >
            <Hexagon className="absolute inset-0 w-full h-full text-brand-orange stroke-[1]" />
            <Hexagon className="absolute inset-0 w-full h-full text-brand-orange stroke-[2] animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-0 bg-brand-orange/10 blur-xl rounded-full"></div>
            <span className="relative z-10 font-black text-brand-orange text-3xl tracking-tighter">XL</span>
          </motion.div>
        </div>

        {/* Login Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white relative overflow-hidden"
        >
          {/* Top orange glowing edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-50"></div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">SYSTEM CORE</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Identification requise</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 text-sm font-semibold rounded-2xl p-4 flex items-center justify-center text-center shadow-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/50 transition-all duration-300 font-medium text-sm"
                  placeholder="Adresse email administrateur"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors duration-300" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/50 transition-all duration-300 font-medium text-sm"
                  placeholder="Mot de passe système"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-300 disabled:opacity-50 mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-orange-400 to-brand-orange opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]"></div>
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-[14px] px-4 py-4 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white font-bold tracking-widest text-xs uppercase">Authentification...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold tracking-widest text-xs uppercase">Initialiser Session</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            Connexion Sécurisée AES-256
          </p>
        </div>
      </div>
    </div>
  );
}
