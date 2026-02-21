import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    console.log('[API] Fetching restaurant:', slug);

    // Load menu data from file system
    const menuPath = path.join(
      process.cwd(),
      'data',
      'restaurants',
      slug,
      'menu.json'
    );

    let menuFile;
    try {
      const fileContent = fs.readFileSync(menuPath, 'utf-8');
      menuFile = JSON.parse(fileContent);
      console.log('[API] Menu file loaded, has categories:', !!menuFile.categories);
    } catch (err) {
      console.error('[API] Menu file not found:', menuPath, err);
      return NextResponse.json(
        { error: 'Menu data not found', slug, path: menuPath },
        { status: 404 }
      );
    }

    // Transform menu.json structure to match preview page expectations
    // menu.json has: { categories: [{ name, items }] }
    // Preview expects: { menu: [{ category, items }] }
    const menuData = menuFile.categories?.map((cat: any) => ({
      category: cat.name,
      items: cat.items.map((item: any) => ({
        name: item.name,
        price: item.price, // Keep as numeric string, frontend adds $
        description: item.description || undefined,
      })),
    })) || [];

    console.log('[API] Transformed menu:', menuData.length, 'categories');

    // Check if restaurant is paid (from Supabase if available)
    let paid = false;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data } = await supabase
          .from('restaurants')
          .select('paid')
          .eq('slug', slug)
          .single();
        
        if (data) {
          paid = data.paid || false;
        }
      } catch (err) {
        console.log('[API] Could not check paid status:', err);
      }
    }

    // Create restaurant data from menu.json or slug
    const restaurant = {
      id: slug,
      slug: slug,
      name: menuFile.restaurant || slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      location: menuFile.location || 'Location not specified',
      created_at: new Date().toISOString(),
      paid,
    };

    console.log('[API] Returning restaurant:', restaurant.name);

    return NextResponse.json({
      restaurant,
      menu: menuData,
    });
  } catch (error) {
    console.error('[API] Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
