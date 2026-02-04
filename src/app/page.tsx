'use client';

import React, { useState } from 'react';
import { Hash, Send, Users, ShieldCheck, Sparkles, MessageSquare, Terminal } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  role: string;
  text: string;
  time: string;
  avatarColor: string;
}

export default function ChatHubPage() {
  const [activeChannel, setActiveChannel] = useState('engineering');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Manikanta', role: 'Full-Stack Developer', text: 'Initialized Supabase Realtime broadcast channel with PostgreSQL replication listeners.', time: '10:14 AM', avatarColor: '#38bdf8' },
    { id: '2', user: 'Valeff Reviewer', role: 'Engineering Lead', text: 'Verified sub-30ms WebSocket latency and presence sync across clients.', time: '10:15 AM', avatarColor: '#f43f5e' },
    { id: '3', user: 'DevOps Node', role: 'Ubuntu VPS', text: 'Nginx reverse proxy with connection upgrade headers running smoothly on port 3000.', time: '10:16 AM', avatarColor: '#34d399' },
  ]);

  const [onlineMembers] = useState([
    { name: 'Manikanta (You)', role: 'Lead', status: 'online', color: '#38bdf8' },
    { name: 'Valeff Reviewer', role: 'Reviewer', status: 'online', color: '#f43f5e' },
    { name: 'DevOps Node', role: 'Worker', status: 'idle', color: '#34d399' },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'Manikanta',
      role: 'Full-Stack Developer',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarColor: '#38bdf8'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const channels = ['engineering', 'general', 'deployments', 'database-audits'];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Left Channel Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center font-bold text-slate-950 shadow">
              <MessageSquare className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">ChatHub Realtime</span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Channels</div>
            {channels.map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  activeChannel === ch
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>{ch}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-4 px-2 space-y-2">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Supabase WSS Connected
          </div>
          <div className="text-[11px] text-slate-500 font-mono">channel: room_{activeChannel}</div>
        </div>
      </aside>

      {/* Main Chat Feed */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/40 backdrop-blur">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-sky-400" />
            <h1 className="font-bold text-base text-white">{activeChannel}</h1>
            <span className="text-xs text-slate-500 hidden sm:inline-block">| PostgreSQL Realtime Replication Feed</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>{onlineMembers.length} active peers</span>
          </div>
        </header>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-900/30 transition">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 shadow shrink-0"
                style={{ backgroundColor: m.avatarColor }}
              >
                {m.user.charAt(0)}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{m.user}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">{m.role}</span>
                  <span className="text-[11px] text-slate-500">{m.time}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel} (broadcasting to peers)...`}
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition shadow-md"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </main>

      {/* Right Online Member List */}
      <aside className="w-56 border-l border-slate-800 bg-slate-900/30 hidden lg:flex flex-col p-4 space-y-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Online Members</div>
        <div className="space-y-2">
          {onlineMembers.map((member, idx) => (
            <div key={idx} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
              <div className="relative">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-950"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name.charAt(0)}
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute bottom-0 right-0 ring-2 ring-slate-950" />
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">{member.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
