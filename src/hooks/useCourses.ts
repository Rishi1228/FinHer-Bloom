import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration: string;
  lessons_count: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image_url: string | null;
  category: string;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  duration: string;
  video_url: string | null;
  order_index: number;
  created_at: string;
}

export interface UserCourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  completed_lessons: string[];
  progress_percentage: number;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');
      
      if (error) throw error;
      return data as Course[];
    },
  });
};

export const useCourseById = (courseId: string | undefined) => {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();
      
      if (error) throw error;
      return data as Course | null;
    },
    enabled: !!courseId,
  });
};

export const useCourseModules = (courseDbId: string | undefined) => {
  return useQuery({
    queryKey: ['course-modules', courseDbId],
    queryFn: async () => {
      if (!courseDbId) return [];
      
      const { data, error } = await supabase
        .from('course_modules')
        .select('*')
        .eq('course_id', courseDbId)
        .order('order_index');
      
      if (error) throw error;
      return data as CourseModule[];
    },
    enabled: !!courseDbId,
  });
};

export const useCourseLessons = (moduleIds: string[]) => {
  return useQuery({
    queryKey: ['course-lessons', moduleIds],
    queryFn: async () => {
      if (!moduleIds.length) return [];
      
      const { data, error } = await supabase
        .from('course_lessons')
        .select('*')
        .in('module_id', moduleIds)
        .order('order_index');
      
      if (error) throw error;
      return data as CourseLesson[];
    },
    enabled: moduleIds.length > 0,
  });
};

export const useUserCourseProgress = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-course-progress', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('user_course_progress')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data as UserCourseProgress[];
    },
    enabled: !!userId,
  });
};

export const useCourseCategories = () => {
  return useQuery({
    queryKey: ['course-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('category');
      
      if (error) throw error;
      
      const categories = ['all', ...new Set(data.map(c => c.category.toLowerCase()))];
      return categories;
    },
  });
};
