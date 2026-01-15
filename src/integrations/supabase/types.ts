export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_comments: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          blog_id: string | null
          content: string
          created_at: string | null
          id: string
          likes: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          blog_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          blog_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_avatar: string | null
          author_name: string
          author_role: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string
          featured: boolean | null
          id: string
          image_url: string | null
          published: boolean | null
          read_time: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_avatar?: string | null
          author_name: string
          author_role?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_avatar?: string | null
          author_name?: string
          author_role?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          read_time?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          created_at: string | null
          duration: string
          id: string
          module_id: string | null
          order_index: number
          title: string
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          duration: string
          id?: string
          module_id?: string | null
          order_index: number
          title: string
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: string
          id?: string
          module_id?: string | null
          order_index?: number
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          order_index: number
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          course_id: string
          created_at: string | null
          description: string
          duration: string
          id: string
          image_url: string | null
          lessons_count: number
          level: string
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          category: string
          course_id: string
          created_at?: string | null
          description: string
          duration: string
          id?: string
          image_url?: string | null
          lessons_count: number
          level: string
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string
          course_id?: string
          created_at?: string | null
          description?: string
          duration?: string
          id?: string
          image_url?: string | null
          lessons_count?: number
          level?: string
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          content: string
          created_at: string | null
          discussion_id: string | null
          id: string
          likes: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          content: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          likes?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          likes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          author_avatar: string | null
          author_id: string | null
          author_name: string
          category: string
          content: string
          created_at: string | null
          id: string
          is_pinned: boolean | null
          likes: number | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_id?: string | null
          author_name: string
          category: string
          content: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          likes?: number | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_id?: string | null
          author_name?: string
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          likes?: number | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scheme_applications: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          scheme_id: string
          scheme_name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          scheme_id: string
          scheme_name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          scheme_id?: string
          scheme_name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      schemes: {
        Row: {
          application_steps: string[]
          benefits: string[]
          category: string
          created_at: string | null
          description: string
          documents: string[]
          eligibility: string[]
          icon: string | null
          id: string
          interest_rate: number | null
          max_investment: number | null
          min_investment: number | null
          name: string
          official_link: string | null
          offline_apply: boolean | null
          online_apply: boolean | null
          scheme_id: string
          short_description: string | null
          tenure: string | null
          updated_at: string | null
        }
        Insert: {
          application_steps?: string[]
          benefits?: string[]
          category: string
          created_at?: string | null
          description: string
          documents?: string[]
          eligibility?: string[]
          icon?: string | null
          id?: string
          interest_rate?: number | null
          max_investment?: number | null
          min_investment?: number | null
          name: string
          official_link?: string | null
          offline_apply?: boolean | null
          online_apply?: boolean | null
          scheme_id: string
          short_description?: string | null
          tenure?: string | null
          updated_at?: string | null
        }
        Update: {
          application_steps?: string[]
          benefits?: string[]
          category?: string
          created_at?: string | null
          description?: string
          documents?: string[]
          eligibility?: string[]
          icon?: string | null
          id?: string
          interest_rate?: number | null
          max_investment?: number | null
          min_investment?: number | null
          name?: string
          official_link?: string | null
          offline_apply?: boolean | null
          online_apply?: boolean | null
          scheme_id?: string
          short_description?: string | null
          tenure?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_course_progress: {
        Row: {
          completed_lessons: string[] | null
          course_id: string
          created_at: string | null
          id: string
          last_accessed_at: string | null
          progress_percentage: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_lessons?: string[] | null
          course_id: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_lessons?: string[] | null
          course_id?: string
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          duration: string | null
          featured: boolean | null
          id: string
          source: string | null
          thumbnail_url: string | null
          title: string
          video_url: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          featured?: boolean | null
          id?: string
          source?: string | null
          thumbnail_url?: string | null
          title: string
          video_url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          featured?: boolean | null
          id?: string
          source?: string | null
          thumbnail_url?: string | null
          title?: string
          video_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
