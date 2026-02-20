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

    let menuData;
    try {
      const menuFile = fs.readFileSync(menuPath, 'utf-8');
      menuData = JSON.parse(menuFile);
      console.log('[API] Menu loaded successfully:', menuData.length || 0, 'categories');
    } catch (err) {
      console.error('[API] Menu file not found:', menuPath, err);
      return NextResponse.json(
        { error: 'Menu data not found', slug, path: menuPath },
        { status: 404 }
      );
    }

    // Create mock restaurant data from slug
    // In production, this would come from Supabase
    const restaurant = {
      id: slug,
      slug: slug,
      name: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      location: 'Location from data',
      created_at: new Date().toISOString(),
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
