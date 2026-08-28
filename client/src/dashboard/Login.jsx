import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-base relative overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent2/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl p-8 sm:p-10 w-full max-w-md border border-white/15 shadow-2xl relative"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-6"
        >
          <FiArrowLeft size={14} /> Back to Website
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-accent2 flex items-center justify-center text-white shadow-glow-sm">
            <FiLock size={18} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">Owner Portal</h1>
          </div>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm mb-7 leading-relaxed">
          Sign in to your private CMS to manage portfolio sections, upload photos, and view inbox messages.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                required
                type="email"
                placeholder="ns.siddarth@icloud.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/80 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
            >
              <FiAlertCircle size={15} /> {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="mt-3 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-black font-bold text-sm shadow-glow-sm hover:shadow-glow-md disabled:opacity-60 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
