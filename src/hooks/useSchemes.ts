import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SchemeFromDB {
  id: string;
  scheme_id: string;
  name: string;
  category: string;
  description: string;
  short_description: string | null;
  eligibility: string[];
  documents: string[];
  application_steps: string[];
  interest_rate: number | null;
  min_investment: number | null;
  max_investment: number | null;
  tenure: string | null;
  benefits: string[];
  online_apply: boolean;
  offline_apply: boolean;
  official_link: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

// For backward compatibility with existing components
export interface SchemeDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  eligibility: {
    age?: string;
    income?: string;
    employment?: string;
    maritalStatus?: string;
    other?: string[];
  };
  documents: {
    name: string;
    required: boolean;
    description: string;
  }[];
  applicationSteps: {
    step: number;
    title: string;
    description: string;
    duration?: string;
  }[];
  interestRate: number;
  minInvestment: number;
  maxInvestment: number;
  tenure: { min: number; max: number };
  online: boolean;
  onlineLink?: string;
  offlineLocations?: string[];
  popular: boolean;
  benefits: string[];
}

// Convert database scheme to legacy format for detail page components
export const convertToSchemeDetails = (scheme: SchemeFromDB): SchemeDetails => {
  // Parse tenure string to min/max
  let tenureMin = 0;
  let tenureMax = 0;
  if (scheme.tenure) {
    const match = scheme.tenure.match(/(\d+)/);
    if (match) {
      tenureMin = parseInt(match[1]);
      tenureMax = tenureMin;
    }
  }

  return {
    id: scheme.scheme_id,
    name: scheme.name,
    category: scheme.category,
    description: scheme.short_description || scheme.description,
    overview: scheme.description,
    eligibility: {
      other: scheme.eligibility,
    },
    documents: scheme.documents.map((doc, index) => ({
      name: doc,
      required: index < 4, // First 4 are required
      description: doc,
    })),
    applicationSteps: scheme.application_steps.map((step, index) => ({
      step: index + 1,
      title: step.split(':')[0] || step.substring(0, 30),
      description: step,
      duration: 'As per process',
    })),
    interestRate: scheme.interest_rate || 0,
    minInvestment: scheme.min_investment || 0,
    maxInvestment: scheme.max_investment || 0,
    tenure: { min: tenureMin, max: tenureMax },
    online: scheme.online_apply,
    onlineLink: scheme.official_link || undefined,
    offlineLocations: scheme.offline_apply ? ['Post Office', 'Banks', 'Government Offices'] : undefined,
    popular: scheme.interest_rate !== null && scheme.interest_rate > 7,
    benefits: scheme.benefits,
  };
};

export const useSchemes = () => {
  return useQuery({
    queryKey: ['schemes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as SchemeFromDB[];
    },
  });
};

export const useSchemeById = (schemeId: string | undefined) => {
  return useQuery({
    queryKey: ['scheme', schemeId],
    queryFn: async () => {
      if (!schemeId) return null;
      
      const { data, error } = await supabase
        .from('schemes')
        .select('*')
        .eq('scheme_id', schemeId)
        .maybeSingle();
      
      if (error) throw error;
      return data as SchemeFromDB | null;
    },
    enabled: !!schemeId,
  });
};

export const useSchemeCategories = () => {
  return useQuery({
    queryKey: ['scheme-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schemes')
        .select('category');
      
      if (error) throw error;
      
      const categories = ['All', ...new Set(data.map(s => s.category))];
      return categories;
    },
  });
};
