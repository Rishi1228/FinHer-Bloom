import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string | null;
  author_name: string;
  author_avatar: string | null;
  category: string;
  likes: number;
  views: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  author_id: string | null;
  author_name: string;
  author_avatar: string | null;
  content: string;
  likes: number;
  created_at: string;
}

export const useDiscussions = () => {
  return useQuery({
    queryKey: ['discussions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Discussion[];
    },
  });
};

export const useDiscussionById = (discussionId: string | undefined) => {
  return useQuery({
    queryKey: ['discussion', discussionId],
    queryFn: async () => {
      if (!discussionId) return null;
      
      const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .eq('id', discussionId)
        .maybeSingle();
      
      if (error) throw error;
      return data as Discussion | null;
    },
    enabled: !!discussionId,
  });
};

export const useDiscussionReplies = (discussionId: string | undefined) => {
  return useQuery({
    queryKey: ['discussion-replies', discussionId],
    queryFn: async () => {
      if (!discussionId) return [];
      
      const { data, error } = await supabase
        .from('discussion_replies')
        .select('*')
        .eq('discussion_id', discussionId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as DiscussionReply[];
    },
    enabled: !!discussionId,
  });
};

export const useDiscussionCategories = () => {
  return useQuery({
    queryKey: ['discussion-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discussions')
        .select('category');
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(d => d.category))];
      return categories;
    },
  });
};

// Count replies for discussions
export const useDiscussionReplyCounts = () => {
  return useQuery({
    queryKey: ['discussion-reply-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('discussion_replies')
        .select('discussion_id');
      
      if (error) throw error;
      
      // Count replies per discussion
      const counts: Record<string, number> = {};
      data.forEach(reply => {
        counts[reply.discussion_id] = (counts[reply.discussion_id] || 0) + 1;
      });
      return counts;
    },
  });
};
