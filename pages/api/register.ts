import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

const supabase = createClient( "https://roqnxtjaksygbykkknwl.supabase.co", process.env.SUPABASE_KEY || '')

async function getViewCount(slug: string) {
    try {
      const { data, error } = await supabase
        .from('views')
        .select('views')
        .eq('slug', slug)
        .single();

      if (error && error.message !== "Item not found") {
        throw error;
      }

      return data ? data.views : null;
    } catch (error) {
      console.error('Error fetching views:', error);
      return null; // In case of error return null to handle it later
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }
    
    const { slug } = req.body;

    try {
        let currentViews = await getViewCount(slug);
        console.log("currentViews", currentViews);
        if (currentViews === null) {
            currentViews = 0;
        }

        // Upsert the view count
        const { data, error } = await supabase
            .from('views')
            .upsert({ slug: slug, views: currentViews + 1 }, { onConflict: 'slug' });

        console.log("data", data);
        console.log("error", error);

        if (error) {
            console.error('Error updating/inserting views:', error);
            res.status(500).send('Failed to update view count');
            return;
        }
        res.status(200).json({ views: currentViews + 1 });
    } catch (err) {
        console.error('Handler error:', err);
        res.status(500).send('Internal Server Error');
    }
}
