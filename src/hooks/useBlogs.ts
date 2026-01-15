import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role: string | null;
  author_avatar: string | null;
  category: string;
  image_url: string | null;
  read_time: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: string;
  blog_id: string;
  author_id: string | null;
  author_name: string;
  author_avatar: string | null;
  content: string;
  likes: number;
  created_at: string;
}

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });
};

export const useBlogBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Blog | null;
    },
    enabled: !!slug,
  });
};

export const useBlogById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['blog-id', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Blog | null;
    },
    enabled: !!id,
  });
};

export const useBlogComments = (blogId: string | undefined) => {
  return useQuery({
    queryKey: ['blog-comments', blogId],
    queryFn: async () => {
      if (!blogId) return [];
      
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blogId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogComment[];
    },
    enabled: !!blogId,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('category')
        .eq('published', true);
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(b => b.category))];
      return categories;
    },
  });
};
