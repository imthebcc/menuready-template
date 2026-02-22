import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurant = searchParams.get('restaurant');

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Missing restaurant parameter' },
        { status: 400 }
      );
    }

    // Load menu data
    const menuPath = path.join(
      process.cwd(),
      'data',
      'restaurants',
      restaurant,
      'menu.json'
    );

    const fileContent = fs.readFileSync(menuPath, 'utf-8');
    const menuData = JSON.parse(fileContent);

    // Generate text menu
    let textContent = `${menuData.restaurant}\n`;
    textContent += `${menuData.location}\n`;
    textContent += `\n${'='.repeat(50)}\n\n`;

    menuData.categories.forEach((category: any) => {
      textContent += `${category.name.toUpperCase()}\n`;
      textContent += `${'-'.repeat(category.name.length)}\n\n`;

      category.items.forEach((item: any) => {
        textContent += `${item.name}`;
        if (item.price) {
          textContent += ` - $${item.price}`;
        }
        textContent += `\n`;
        if (item.description) {
          textContent += `  ${item.description}\n`;
        }
        textContent += `\n`;
      });

      textContent += `\n`;
    });

    textContent += `\n${'='.repeat(50)}\n`;
    textContent += `\nPowered by Menus Ready\n`;
    textContent += `menusready.com\n`;

    // Return as downloadable file
    return new NextResponse(textContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${restaurant}-menu.txt"`,
      },
    });
  } catch (error) {
    console.error('[Download Text] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate text menu' },
      { status: 500 }
    );
  }
}
