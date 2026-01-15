import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration: string | null;
  category: string;
  source: string | null;
  featured: boolean;
  created_at: string;
}

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Video[];
    },
  });
};

export const useFeaturedVideos = () => {
  return useQuery({
    queryKey: ['featured-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('featured', true)
        .limit(6);
      
      if (error) throw error;
      return data as Video[];
    },
  });
};

export const useVideosByCategory = (category: string) => {
  return useQuery({
    queryKey: ['videos-category', category],
    queryFn: async () => {
      let query = supabase.from('videos').select('*');
      
      if (category !== 'All') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Video[];
    },
    enabled: !!category,
  });
};

export const useVideoCategories = () => {
  return useQuery({
    queryKey: ['video-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('category');
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(v => v.category))];
      return categories;
    },
  });
};
