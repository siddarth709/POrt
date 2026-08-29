import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiKey, FiArrowLeft, FiAlertCircle, FiCheck, FiCopy, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { getAuthStatus, setupTotp, loginWithTotp, regenerateQr } = useAuth();
  const navigate = useNavigate();

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [isSetup, setIsSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    setError('');
    try {
      const data = await getAuthStatus();
      setIsSetup(data.isSetup);
      if (!data.isSetup) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to authentication service. Please ensure backend is running.');
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleRegenerate = async () => {
    setError('');
    try {
      const data = await regenerateQr();
      setQrCode(data.qrCode);
      setSecret(data.secret);
    } catch (err) {
      setError('Failed to regenerate QR code.');
    }
  };

  const handleCopySecret = () => {
    if (!secret) return;
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 6) {
      setError('Please enter a valid 6-digit verification code.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      if (isSetup) {
        await loginWithTotp(otp.trim());
      } else {
        await setupTotp(otp.trim());
      }
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (isSetup ? 'Invalid or expired OTP code. Please check your authenticator app.' : 'Verification failed. Please re-check code.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-base relative overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl p-8 sm:p-10 w-full max-w-lg border border-white/15 shadow-2xl relative"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors mb-6"
        >
          <FiArrowLeft size={14} /> Back to Website
        </Link>

        {loadingStatus ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-slate-400">Checking security credentials...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-bold shadow-glow-cyan">
                {isSetup ? <FiShield size={20} /> : <FiKey size={20} />}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white tracking-tight">
                  {isSetup ? 'Owner Security Portal' : 'Setup 2FA Authentication'}
                </h1>
                <span className="text-[11px] font-mono text-emerald-400">TOTP Authenticator Protection</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
              {isSetup
                ? 'Enter the live 6-digit code from Google Authenticator, Authy, or Apple Passwords to sign in.'
                : 'Scan the QR code below using any Authenticator app (Google Authenticator, Microsoft Authenticator, Authy, Apple Passwords) to link your account.'}
            </p>

            <AnimatePresence mode="wait">
              {!isSetup && qrCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 flex flex-col items-center bg-white/[0.03] border border-white/10 rounded-2xl p-5"
                >
                  <div className="p-3 bg-white rounded-2xl shadow-xl border border-white/20 mb-4">
                    <img src={qrCode} alt="TOTP QR Code" className="w-44 h-44 object-contain" />
                  </div>

                  <div className="w-full text-center">
                    <p className="text-[11px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Or manually enter setup key
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="px-3 py-1 bg-black/60 rounded-lg text-xs font-mono text-cyan-300 select-all border border-white/10">
                        {secret}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopySecret}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="Copy Key"
                      >
                        {copied ? <FiCheck className="text-emerald-400" size={14} /> : <FiCopy size={14} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <FiRefreshCw size={11} /> Generate New QR
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  {isSetup ? '6-Digit Security Code' : 'Verify 6-Digit Code'}
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full bg-surface/90 border border-white/15 rounded-xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.4em] text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5"
                >
                  <FiAlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting || otp.length < 6}
                className="mt-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold text-sm shadow-glow-cyan hover:shadow-glow-cyan-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : isSetup ? (
                  <span>Authenticate & Enter CMS</span>
                ) : (
                  <span>Verify & Activate 2FA</span>
                )}
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
