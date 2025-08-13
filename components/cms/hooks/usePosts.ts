// components/cms/hooks/usePosts.ts
import { useState, useEffect } from 'react';
import { BlogPost } from '../types';

export const usePosts = (getAuthHeaders: () => Record<string, string>) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (filters?: {
    search?: string;
    status?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/blog?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Network error while fetching posts');
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (postData: Partial<BlogPost>): Promise<{success: boolean, error?: string}> => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        await fetchPosts(); // Refresh posts list
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Failed to create post' };
      }
    } catch (error) {
      return { success: false, error: 'Network error while creating post' };
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>): Promise<{success: boolean, error?: string}> => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        await fetchPosts(); // Refresh posts list
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Failed to update post' };
      }
    } catch (error) {
      return { success: false, error: 'Network error while updating post' };
    }
  };

  const deletePost = async (id: string): Promise<{success: boolean, error?: string}> => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Failed to delete post' };
      }
    } catch (error) {
      return { success: false, error: 'Network error while deleting post' };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost
  };
};
