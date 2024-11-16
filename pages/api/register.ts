import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseClient } from '@supabase/supabase-js'; 

async function getViewCount(slug: string, supabase: SupabaseClient) {
    try {
      const { data, error } = await supabase.from('views').select('views').eq('slug', slug);
      if (error) {
        throw error;
      }
      if (!data || data.length === 0) {
        return 0; // Assuming you want to return 0 views if there's no record
      }
      return data[0].views;
    } catch (error) {
      console.error('Error fetching views:', error);
      return null; // Handle the error as you see fit
    }
  }
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const supabase = createClient( "https://roqnxtjaksygbykkknwl.supabase.co", process.env.SUPABASE_KEY || '')
    const { slug } = req.body;
    const views = await getViewCount(slug, supabase);
    await supabase
    .from('views')
    .update({ views: views+1 })
    .eq('slug', slug)
    res.status(200).send(views+1);
  } catch(err) {
    console.log("Err", err);
    res.status(400).send("Internal Server Error");
  }
}


