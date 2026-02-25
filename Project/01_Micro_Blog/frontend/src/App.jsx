import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Edit3, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Landing from './components/Landing';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'published'

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 'blog') {
      fetchPosts();
    }
  }, [currentPage]);

  const handleCreatePost = async (formData) => {
    setSubmitLoading(true);
    try {
      const payload = { ...formData, isPublished: true };
      const res = await axios.post('/api/posts', payload);
      setPosts([res.data, ...posts]);
    } catch (err) {
      alert('Failed to create post');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`/api/posts/${id}`, { action: 'like' });
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    } catch (err) {
      alert('Failed to like post');
    }
  };

  const handleTogglePublish = async (id, newStatus) => {
    try {
      const res = await axios.put(`/api/posts/${id}`, { isPublished: newStatus });
      setPosts(posts.map(p => p.id === id ? res.data : p));
    } catch (err) {
      alert('Failed to update publish status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const [activeTab, setActiveTab] = useState('feed'); // 'feed' or 'create'

  if (currentPage === 'landing') {
    return <Landing onEnter={() => setCurrentPage('blog')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 flex flex-col relative overflow-hidden pb-20 font-sans">

      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Premium Glass Header */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 relative">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <button
              onClick={() => setCurrentPage('landing')}
              className="text-slate-400 hover:text-indigo-400 font-medium transition-colors text-sm flex items-center gap-1.5"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Mini Blog
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Navigation Tabs */}
            <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'feed' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
              >
                <BookOpen size={16} /> Feed
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
              >
                <Edit3 size={16} /> Create
              </button>
            </div>

            {/* Mode Toggle (only show on Feed) */}
            {activeTab === 'feed' && (
              <button
                onClick={() => setViewMode(viewMode === 'all' ? 'published' : 'all')}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                title={viewMode === 'all' ? 'Switch to Public View' : 'Switch to Admin View'}
              >
                {viewMode === 'all' ? <><Eye size={18} className="text-indigo-400" /> Admin</> : <><EyeOff size={18} className="text-slate-500" /> Public</>}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 mt-10 w-full relative z-10">

        {activeTab === 'create' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PostForm onSubmit={(data) => {
              handleCreatePost(data);
              setActiveTab('feed'); // Auto swap to feed after posting
            }} loading={submitLoading} />
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {error && (
              <div className="bg-red-900/30 backdrop-blur-md shadow-sm text-red-400 p-5 rounded-2xl mb-8 border border-red-800 flex justify-between items-center">
                <span>{error}</span>
                <button onClick={fetchPosts} className="underline font-semibold hover:text-red-300">Retry</button>
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Latest Posts</h2>
              <span className="text-sm font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                {posts.length} Posts {viewMode === 'published' && '(Published Only)'}
              </span>
            </div>

            <PostList
              posts={posts}
              loading={loading}
              filterPublished={viewMode === 'published'}
              onLike={handleLike}
              onTogglePublish={handleTogglePublish}
              onDelete={handleDelete}
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
