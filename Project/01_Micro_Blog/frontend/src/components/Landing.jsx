import React from 'react';
import { ArrowRight, PenTool, Users } from 'lucide-react';

export default function Landing({ onEnter }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 flex flex-col relative overflow-hidden">

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10 w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 lg:gap-8">

                    {/* Hero Left */}
                    <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm mb-2">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            Welcome to the New Era
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Express Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Thoughts</span> Beautifully.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                            A premium, minimalist platform designed for creators. Build your audience, share your stories, and engage with a global community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <button
                                onClick={onEnter}
                                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all hover:scale-105"
                            >
                                Go to Blog
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Hero Right - Glass Cards */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none ml-auto grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                                <PenTool className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Create Content</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Publish rich text articles, manage your drafts, and control visibility seamlessly.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl transform translate-y-0 sm:translate-y-12 hover:translate-y-8 transition-transform duration-300">
                            <div className="w-12 h-12 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-6 border border-fuchsia-500/30">
                                <Users className="text-fuchsia-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Engage Readers</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Allow users to like and share your posts across platforms natively.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
