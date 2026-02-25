import React, { useState } from 'react';

export default function PostForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({ title: '', content: '', author: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content || !formData.author) return;
        onSubmit(formData);
        setFormData({ title: '', content: '', author: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] p-6 mb-8 border border-slate-800 sticky top-28">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">Create New Post</h2>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-white"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="What's on your mind?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="author">Author Name</label>
                    <input
                        id="author"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 text-white"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="content">Post Content</label>
                    <textarea
                        id="content"
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none placeholder:text-slate-600 text-white"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your thoughts..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)] focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-4 border border-indigo-500/50"
                >
                    {loading ? 'Publishing...' : 'Publish Post'}
                </button>
            </div>
        </form>
    );
}
