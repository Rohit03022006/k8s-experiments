import React from 'react';
import PostCard from './PostCard';

export default function PostList({ posts, onLike, onTogglePublish, onDelete, loading, filterPublished }) {
    // If filterPublished is true, ONLY show published posts. Otherwise, show all.
    const filteredPosts = filterPublished
        ? posts.filter(post => post.isPublished)
        : posts;

    if (loading && posts.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (filteredPosts.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-sm border border-slate-800">
                <h3 className="text-xl text-slate-300 font-bold mb-2">No posts found</h3>
                <p className="text-slate-500">Be the first to create one!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 max-h-[800px] overflow-y-auto pr-4 pb-4 custom-scrollbar">
            {filteredPosts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    onLike={onLike}
                    onTogglePublish={onTogglePublish}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
