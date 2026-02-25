import React, { useState } from 'react';
import { Share2, ThumbsUp, Trash2, Eye, EyeOff } from 'lucide-react';

export default function PostCard({ post, onLike, onTogglePublish, onDelete }) {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        // Generate a simple dummy URL representing this post
        const url = `${window.location.origin}/post/${post.id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide message after 2s
            });
    };

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] border border-slate-800 transition-all hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:border-slate-700 mb-2 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">{post.title}</h3>
                        <p className="text-sm text-slate-400 flex items-center gap-2">
                            <span className="font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">{post.author}</span>
                            <span className="text-slate-600">•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 text-xs rounded-full font-bold tracking-wide uppercase border ${post.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>
                            {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                    </div>
                </div>

                <p className="text-slate-300 mb-6 whitespace-pre-line leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-4">
                    <div className="flex gap-4">
                        <button
                            onClick={() => onLike(post.id)}
                            className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            <ThumbsUp size={18} />
                            <span className="font-medium">{post.likes}</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 text-slate-400 hover:text-fuchsia-400 transition-colors"
                            >
                                <Share2 size={18} />
                                <span className="font-medium">Share</span>
                            </button>
                            {copied && (
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap border border-slate-700">
                                    Link copied!
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 text-slate-500">
                        <button
                            onClick={() => onTogglePublish(post.id, !post.isPublished)}
                            className="hover:text-amber-400 transition-colors"
                            title={post.isPublished ? "Unpublish Post" : "Publish Post"}
                        >
                            {post.isPublished ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <button
                            onClick={() => onDelete(post.id)}
                            className="hover:text-red-400 transition-colors"
                            title="Delete Post"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
