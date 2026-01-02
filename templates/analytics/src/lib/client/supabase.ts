import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { iGenericCompetitor, TCountryCode } from '$lib/interface';
import { toast } from 'svelte-sonner';

const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
)

export const getCompetitors = async (code: TCountryCode) => {
  try {
    let { data, error } = await supabase.from(code).select('*');
    if (data && data.length) {
      return data as iGenericCompetitor[];
    } else {
      return [];
    }
  } catch (error) {
    toast.error('Failed to update competitors', {
      description: 'An error occurred while updating competitors.'
    });
    console.error('Error updating competitors:', error);
    return [];
  }
};

export { supabase }