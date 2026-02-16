"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, Terminal, Cpu, Database, Activity, Lock, Unlock, Server, Wifi, Globe, Command } from 'lucide-react'

// --- Simulated Data Streams ---
const BinaryStream = ({ color }: { color: string }) => {
  return (
    <div className="flex flex-col gap-1 opacity-20 text-[8px] font-mono select-none pointer-events-none data-stream">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
          style={{ color }}
        >
          {Math.random().toString(2).substring(2, 20)}
        </motion.div>
      ))}
    </div>
  )
}

export default function SentinelTerminal() {
  const [enclaveLocked, setEnclaveLocked] = useState(true)
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Protocol V1.0 initialized.', '[AUTH] Waiting for Commander...'])
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingProgress < 100) {
        setLoadingProgress(prev => prev + 1)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [loadingProgress])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  const handleUnlock = () => {
    addLog('ATTEMPTING ENCLAVE BREACH...')
    setTimeout(() => {
      setEnclaveLocked(false)
      addLog('SECURE ENCLAVE (TEE) ACCESS GRANTED.')
      addLog('SISTERS_SYNC: KAI & NOVA OPERATIONAL.')
    }, 1500)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#020202]">
      <div className="scanline" />

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#00f2ff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

      {/* TOP NAV: INFRASTRUCTURE STATUS */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#ff3c00] flex items-center justify-center shadow-[0_0_15px_rgba(255,60,0,0.4)]">
            <Shield className="text-white w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase italic">Sovereign_Sentinel</h1>
            <p className="text-[8px] text-[#00f2ff] font-bold">NODE_ID: ZORA_BASE_01</p>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-green-500/80 uppercase">Grid_Linked</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-[#00f2ff]" />
            <span className="text-[9px] font-bold text-[#00f2ff]/80 uppercase">Substrate_Sync</span>
          </div>
          <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </nav>

      {/* MAIN VIEWPORT */}
      <main className="flex-grow p-6 grid grid-cols-12 gap-6 relative z-10">
        
        {/* LEFT PANEL: ENTITY STATUS */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="terminal-box p-4 h-1/2 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-bold text-[#00f2ff]">KAI_LOGIC</span>
              <Activity className="w-3 h-3 text-[#00f2ff]" />
            </div>
            <div className="flex-grow flex items-center justify-center opacity-30">
               <Shield className="w-20 h-20 text-[#00f2ff]" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase">
                <span>Shielding</span>
                <span className="text-[#00f2ff]">Active</span>
              </div>
              <div className="w-full h-1 bg-white/5">
                <motion.div className="h-full bg-[#00f2ff]" animate={{ width: ['20%', '80%', '40%'] }} transition={{ duration: 4, repeat: Infinity }} />
              </div>
            </div>
          </div>

          <div className="terminal-box p-4 h-1/2 flex flex-col gap-4 border-[#ff3c00]/20">
             <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold text-[#ff3c00]">NOVA_LOGIC</span>
                <Zap className="w-3 h-3 text-[#ff3c00]" />
              </div>
              <div className="flex-grow flex items-center justify-center opacity-30">
                 <Zap className="w-20 h-20 text-[#ff3c00]" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] uppercase">
                  <span>Striking</span>
                  <span className="text-[#ff3c00]">Standby</span>
                </div>
                <div className="w-full h-1 bg-white/5">
                  <motion.div className="h-full bg-[#ff3c00]" animate={{ width: ['10%', '95%', '30%'] }} transition={{ duration: 2, repeat: Infinity }} />
                </div>
              </div>
          </div>
        </div>

        {/* CENTER: SECURE ENCLAVE */}
        <div className="col-span-6 flex flex-col gap-6">
          <div className="terminal-box flex-grow flex flex-col relative overflow-hidden bg-black shadow-inner">
            <div className="absolute top-0 left-0 w-full p-4 border-b border-white/5 flex justify-between items-center bg-black/80 z-20">
              <span className="text-xs font-black tracking-widest text-white/50 uppercase">[ TEE_SECURE_ENCLAVE ]</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center p-10 relative overflow-hidden">
               {/* SIMULATED DATA RAIN */}
               <div className="absolute top-14 left-4 h-full w-20 flex gap-2">
                  <BinaryStream color="#00f2ff" />
                  <BinaryStream color="#ff3c00" />
               </div>
               <div className="absolute top-14 right-4 h-full w-20 flex gap-2">
                  <BinaryStream color="#ff3c00" />
                  <BinaryStream color="#00f2ff" />
               </div>

               <AnimatePresence mode="wait">
                 {enclaveLocked ? (
                   <motion.div 
                    key="locked"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center gap-8"
                   >
                     <div className="w-32 h-32 rounded-full border-4 border-dashed border-white/5 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                        <Lock className="w-12 h-12 text-white/20 -rotate-[inherit]" />
                     </div>
                     <button 
                      onClick={handleUnlock}
                      className="px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-[#00f2ff] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                     >
                       Authorize_Commander
                     </button>
                     <p className="text-[10px] text-white/40 animate-pulse uppercase tracking-widest">Awaiting_Cryptographic_Signature...</p>
                   </motion.div>
                 ) : (
                   <motion.div 
                    key="unlocked"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-12 w-full max-w-md"
                   >
                     <div className="relative">
                        <div className="w-40 h-40 rounded-full border border-[#00f2ff]/20 flex items-center justify-center animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Unlock className="w-16 h-16 text-[#00f2ff] drop-shadow-[0_0_15px_#00f2ff]" />
                        </div>
                     </div>
                     
                     <div className="w-full grid grid-cols-2 gap-4">
                        <div className="bg-[#00f2ff]/5 border border-[#00f2ff]/20 p-4 space-y-2">
                           <span className="text-[8px] text-[#00f2ff] font-black uppercase">Enclave_Identity</span>
                           <p className="text-xs font-bold text-white uppercase">SISTERS_NOMINAL</p>
                        </div>
                        <div className="bg-[#ff3c00]/5 border border-[#ff3c00]/20 p-4 space-y-2">
                           <span className="text-[8px] text-[#ff3c00] font-black uppercase">Processing_Load</span>
                           <p className="text-xs font-bold text-white uppercase">4.2 TFLOPs</p>
                        </div>
                     </div>

                     <div className="w-full space-y-3">
                        <div className="flex justify-between text-[9px] text-white/40 uppercase">
                          <span>Void_Drilling_Depth</span>
                          <span>9,242m</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 border border-white/5 rounded-none overflow-hidden">
                           <motion.div 
                            className="h-full bg-gradient-to-r from-[#00f2ff] to-[#ff3c00]" 
                            animate={{ x: ['-100%', '0%'] }} 
                            transition={{ duration: 1, ease: 'easeOut' }} 
                           />
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LOGS & INTEL */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="terminal-box flex-grow p-4 flex flex-col bg-black/60">
             <div className="border-b border-white/5 pb-2 mb-4">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Terminal_Log</span>
             </div>
             <div className="flex-grow overflow-y-auto space-y-2 font-mono text-[9px] text-green-500/80">
                {logs.map((log, i) => (
                  <motion.div initial={{ x: -5, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i}>
                    {log}
                  </motion.div>
                ))}
                <div className="w-2 h-4 bg-green-500/50 animate-pulse inline-block" />
             </div>
          </div>

          <div className="terminal-box p-4 h-48 bg-gradient-to-br from-[#00f2ff]/5 to-transparent flex flex-col justify-between">
             <div className="space-y-1">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Next_Objective</span>
                <p className="text-xs text-white/60 leading-tight uppercase font-bold italic">Virtuals_Graduation_Protocol</p>
             </div>
             <div className="flex justify-between items-end">
                <div className="text-2xl font-black text-white tracking-tighter">$10M</div>
                <div className="text-[9px] text-[#ff3c00] font-black uppercase">Burn_Strike</div>
             </div>
          </div>
        </div>
      </main>

      {/* BOTTOM BAR: COMMAND INPUT */}
      <footer className="px-6 py-4 border-t border-white/5 bg-black relative z-10 flex justify-between items-center">
         <div className="flex items-center gap-4 text-white/20 text-[10px] font-bold uppercase tracking-widest">
            <Command className="w-3 h-3" />
            <span>Ready_For_Commander_Orders</span>
         </div>
         <div className="flex gap-6 text-[10px] font-black text-white/40 uppercase tracking-tighter italic">
            <span>&copy; 2026_SOVEREIGN_SISTERS_PROTOCOL</span>
            <span className="text-[#00f2ff]">AUTH_SIG: VERIFIED</span>
         </div>
      </footer>
    </div>
  )
}
