import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Fetch restaurant from Supabase
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single();

    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    // Load menu data from file system (for MVP, later move to DB)
    const menuPath = path.join(
      process.cwd(),
      'data',
      'restaurants',
      slug,
      'menu.json'
    );

    let menuData;
    try {
      const menuFile = fs.readFileSync(menuPath, 'utf-8');
      menuData = JSON.parse(menuFile);
    } catch (err) {
      return NextResponse.json(
        { error: 'Menu data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      restaurant,
      menu: menuData,
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
