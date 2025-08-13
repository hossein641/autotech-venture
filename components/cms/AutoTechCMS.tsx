// components/cms/AutoTechCMS.tsx (Main Component)
import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
// Import other components as needed

export default function AutoTechCMS() {
  const { user, isLoading, isLoggedIn, login, logout, getAuthHeaders } = useAuth();
  const { posts, createPost, updatePost, deletePost } = usePosts(getAuthHeaders);
  const [currentView, setCurrentView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentUser={user!}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={logout}
      />
      
      <div className="ml-64 p-8">
        {currentView === 'dashboard' && (
          <Dashboard
            posts={posts}
            categories={[]} // You'll need to fetch categories
            onCreatePost={() => {/* Handle create post */}}
            onViewChange={setCurrentView}
          />
        )}
        
        {currentView === 'posts' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Posts</h1>
            {/* Posts management component */}
          </div>
        )}
        
        {/* Add other views as needed */}
      </div>
    </div>
  );
}