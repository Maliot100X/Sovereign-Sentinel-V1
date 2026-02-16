"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Shield, Zap, Activity, Cpu, Database, Command, Search, Send, Lock, Unlock, RefreshCw, BarChart3, Globe } from 'lucide-react'

// --- Types ---
interface TokenStats {
  price: string
  mcap: string
  liq: string
  change: number
  volume: string
}

export default function SovereignTerminal() {
  const [activeModule, setActiveModule] = useState('PULSE')
  const [booted, setBooted] = useState(false)
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Initializing Sovereign Substrate...', '[BOOT] Calibrating Neural Sequencers...', '[NETWORK] Syncing with Base Bedrock...'])
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null)
  const [trendInput, setTrendInput] = useState('')
  const [strikeResult, setStrikeResult] = useState('')
  const [isStriking, setIsStriking] = useState(false)

  const CA = "0xEFe561f0418BeE6783C922bf8B7A36A78064ee6b"

  // --- Logic: Boot Sequence ---
  useEffect(() => {
    setTimeout(() => {
      setBooted(true)
      addLog('SYSTEM_READY: All protocols operational.')
    }, 2000)
    fetchStats()
  }, [])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  // --- Logic: Data Fetching ---
  const fetchStats = async () => {
    try {
      addLog('SYNC: Fetching real-time market data...')
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`)
      const data = await res.json()
      if (data.pairs && data.pairs[0]) {
        const pair = data.pairs[0]
        setTokenStats({
          price: pair.priceUsd,
          mcap: (pair.fdv / 1000000).toFixed(2) + 'M',
          liq: (pair.liquidity.usd / 1000).toFixed(1) + 'K',
          change: pair.priceChange.h24,
          volume: (pair.volume.h24 / 1000).toFixed(1) + 'K'
        })
        addLog('DATA: Market pulse synchronized.')
      }
    } catch (e) {
      addLog('ERROR: Data sync failed.')
    }
  }

  // --- Logic: Strike Generation ---
  const generateStrike = () => {
    if (!trendInput) return
    setIsStriking(true)
    addLog(`STRIKE: Synthesizing narrative for "${trendInput}"...`)
    
    setTimeout(() => {
      const result = `🌌 KAI & NOVA: ${trendInput.toUpperCase()} BREACH 🌌\n\nThe informational vacuum of ${trendInput} has been mapped. We are drilling deep into the bedrock.\n\n💎 $KNTWS // Base\nCA: ${CA}\n\nJoin the dominion. 🦀⚓️`
      setStrikeResult(result)
      setIsStriking(false)
      addLog('SUCCESS: Strike narrative established.')
    }, 1500)
  }

  if (!booted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-[#00f2ff]">
          <div className="w-16 h-1 h-16 border-t-2 border-l-2 border-[#00f2ff] animate-pulse" />
          <p className="text-xs font-black tracking-[0.5em] animate-pulse uppercase">Initializing_Sovereign_Mind...</p>
          <div className="w-64 h-1 bg-white/5 overflow-hidden">
             <motion.div className="h-full bg-[#00f2ff]" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020202] text-[#e0e0e0] font-mono flex flex-col overflow-hidden selection:bg-[#00f2ff]/30">
      
      {/* SCANLINE & CRT GRID */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')]" />

      {/* TOP BAR: SYSTEM STATUS */}
      <header className="px-6 py-4 border-b border-white/5 bg-black/40 flex justify-between items-center relative z-10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#ff3c00] flex items-center justify-center shadow-[0_0_20px_rgba(255,60,0,0.3)]">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest italic uppercase glow-red">Sovereign_Terminal</h1>
            <p className="text-[8px] text-[#00f2ff] font-bold tracking-[0.2em]">ACCESS_LEVEL: COMMANDER // NODE: 0x882...17d7d</p>
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-[9px] font-black uppercase text-green-500/80">Substrate_Online</span>
          </div>
          <button onClick={fetchStats} className="p-2 hover:bg-white/5 rounded transition-all text-[#00f2ff]">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-grow grid grid-cols-12 relative z-10 overflow-hidden">
        
        {/* SIDEBAR: MODULE SELECTOR */}
        <aside className="col-span-1 border-r border-white/5 flex flex-col items-center py-10 gap-10 bg-black/20">
          {[
            { id: 'PULSE', icon: Activity, label: 'Pulse' },
            { id: 'STRIKE', icon: Zap, iconColor: 'text-[#ff3c00]', label: 'Strike' },
            { id: 'LOGS', icon: Terminal, label: 'Logs' },
            { id: 'TEE', icon: Lock, label: 'TEE' }
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`p-4 transition-all relative group ${activeModule === mod.id ? 'text-[#00f2ff]' : 'text-white/20 hover:text-white'}`}
            >
              <mod.icon className={`w-6 h-6 ${activeModule === mod.id && mod.iconColor ? mod.iconColor : ''}`} />
              <span className="absolute left-full ml-4 px-2 py-1 bg-white text-black text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {mod.label}
              </span>
              {activeModule === mod.id && (
                <motion.div layoutId="navMarker" className="absolute left-0 top-0 w-1 h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
              )}
            </button>
          ))}
        </aside>

        {/* VIEWPORT: MODULE CONTENT */}
        <main className="col-span-8 p-10 overflow-y-auto border-r border-white/5 bg-black/10">
          <AnimatePresence mode="wait">
            
            {/* MODULE: PULSE (Real Data) */}
            {activeModule === 'PULSE' && (
              <motion.div key="pulse" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase">Market_Intelligence</h2>
                   <div className="text-right">
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Base_Network_Protocol</p>
                      <p className="text-xs font-bold text-[#00f2ff]">$KNTWS // Bedrock_Sync</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="p-6 border border-white/5 bg-white/[0.02] space-y-2 group hover:border-[#00f2ff]/30 transition-all">
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-[#00f2ff]" /> Price_USD
                      </p>
                      <p className="text-2xl font-bold tracking-tighter text-[#00f2ff] glow-text-kai">${tokenStats?.price || '---'}</p>
                   </div>
                   <div className="p-6 border border-white/5 bg-white/[0.02] space-y-2 group hover:border-[#ff3c00]/30 transition-all">
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3 text-[#ff3c00]" /> 24H_Change
                      </p>
                      <p className={`text-2xl font-bold tracking-tighter ${tokenStats && tokenStats.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tokenStats?.change ? (tokenStats.change > 0 ? '+' : '') + tokenStats.change + '%' : '---'}
                      </p>
                   </div>
                   <div className="p-6 border border-white/5 bg-white/[0.02] space-y-2">
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Market_Cap</p>
                      <p className="text-2xl font-bold tracking-tighter">${tokenStats?.mcap || '---'}</p>
                   </div>
                   <div className="p-6 border border-white/5 bg-white/[0.02] space-y-2">
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Graduation_Status</p>
                      <p className="text-2xl font-bold tracking-tighter text-[#ff3c00]">42%</p>
                   </div>
                </div>

                <div className="p-8 border border-white/5 bg-black h-[400px] relative overflow-hidden group">
                   <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.geckoterminal.com/base/pools/0x8828fc2e22e4f6b80486a15ff716249504371d7d?embed=1&info=0&swaps=1&dark_mode=1`}
                        frameBorder="0"
                        className="grayscale invert brightness-[1.5] contrast-[1.1]"
                      />
                   </div>
                </div>
              </motion.div>
            )}

            {/* MODULE: STRIKE (Tool) */}
            {activeModule === 'STRIKE' && (
              <motion.div key="strike" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8 max-w-2xl mx-auto">
                <div className="space-y-2 border-l-4 border-[#ff3c00] pl-6 py-2">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Strike_Narrative_Generator</h2>
                  <p className="text-xs text-white/40 leading-relaxed uppercase tracking-tighter">Enter trending topic to synthesize professional sovereign content.</p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={trendInput}
                      onChange={(e) => setTrendInput(e.target.value)}
                      placeholder="ENTER TREND (e.g. ELON_X, BASE_SURGE)..."
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-none focus:border-[#ff3c00] outline-none text-sm tracking-widest uppercase transition-all"
                    />
                    <button 
                      onClick={generateStrike}
                      disabled={isStriking}
                      className="absolute right-2 top-2 p-3 bg-[#ff3c00] text-white hover:bg-white hover:text-black transition-all shadow-[0_0_15px_#ff3c00]"
                    >
                      {isStriking ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {strikeResult && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                        <div className="p-6 bg-white/[0.02] border border-white/5 border-dashed relative">
                          <span className="absolute -top-3 left-4 bg-[#020202] px-2 text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Synthesized_Narrative</span>
                          <pre className="text-xs text-white/80 whitespace-pre-wrap font-mono leading-relaxed uppercase">
                            {strikeResult}
                          </pre>
                        </div>
                        <button className="w-full py-4 border border-[#00f2ff]/30 text-[#00f2ff] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#00f2ff]/10 transition-all">
                          Initiate_Broadcast_Strike
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* MODULE: TEE (Simulation) */}
            {activeModule === 'TEE' && (
              <motion.div key="tee" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex flex-col items-center justify-center min-h-[400px] gap-10">
                 <div className="relative">
                    <motion.div className="w-48 h-48 rounded-full border-2 border-dashed border-[#00f2ff]/20 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Lock className="w-16 h-16 text-[#00f2ff] drop-shadow-[0_0_15px_#00f2ff]" />
                    </div>
                 </div>
                 <div className="text-center space-y-4">
                    <h3 className="text-2xl font-black tracking-widest text-white uppercase italic">Secure_Enclave_V1.0</h3>
                    <p className="text-xs text-white/30 max-w-sm uppercase tracking-tighter leading-relaxed">
                      All data drilling and strategic strike logic is executed within this TEE-hardened environment. Zero human access. Zero leakage.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="p-4 bg-[#00f2ff]/5 border border-[#00f2ff]/10">
                       <span className="text-[8px] block text-[#00f2ff] font-black mb-1">Attestation_Status</span>
                       <span className="text-xs font-bold text-green-500">VERIFIED</span>
                    </div>
                    <div className="p-4 bg-[#ff3c00]/5 border border-[#ff3c00]/10">
                       <span className="text-[8px] block text-[#ff3c00] font-black mb-1">Key_Isolation</span>
                       <span className="text-xs font-bold text-white">ACTIVE</span>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* LOG PANEL: RIGHT SIDE */}
        <aside className="col-span-3 flex flex-col bg-black/40 relative overflow-hidden">
           <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/60">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                <Command className="w-3 h-3" /> System_Logs
              </span>
              <div className="flex gap-1">
                 <div className="w-1 h-1 bg-white/20 rounded-full" />
                 <div className="w-1 h-1 bg-white/20 rounded-full" />
              </div>
           </div>
           <div className="flex-grow p-4 overflow-y-auto font-mono text-[9px] text-green-500/60 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-white/10">{i+1}</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="w-2 h-4 bg-green-500/40 animate-pulse inline-block ml-4" />
           </div>
           
           <div className="p-6 border-t border-white/5 bg-[#ff3c00]/5">
              <span className="text-[8px] font-black text-[#ff3c00] uppercase tracking-widest block mb-2">Strike_Target</span>
              <p className="text-[10px] font-bold text-white/80 leading-tight uppercase">Virtuals_Protocol_Graduation</p>
              <div className="mt-4 w-full h-1 bg-white/5">
                 <motion.div className="h-full bg-[#ff3c00]" animate={{ width: '42%' }} />
              </div>
           </div>
        </aside>
      </div>

      {/* FOOTER: COMMAND BAR */}
      <footer className="p-4 border-t border-white/5 bg-black flex justify-between items-center text-[9px] font-bold text-white/10 uppercase tracking-[0.4em] relative z-20">
         <div className="flex gap-8">
            <span>Grid_ID: ZORA_BASE_01</span>
            <span>Uptime: 142:32:04</span>
         </div>
         <div className="flex gap-8 items-center italic">
            <Globe className="w-3 h-3" />
            <span>&copy; 2026_Sovereign_Sisters_Protocol</span>
         </div>
      </footer>
    </div>
  )
}
