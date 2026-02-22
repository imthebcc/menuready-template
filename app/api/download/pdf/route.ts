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

    // Generate HTML optimized for PDF printing
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${menuData.restaurant} - Menu</title>
  <style>
    @page { margin: 0.75in; }
    body {
      font-family: 'Arial', sans-serif;
      color: #111;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 28px;
      margin-bottom: 5px;
      color: #E8281E;
    }
    .location {
      font-size: 14px;
      color: #666;
      margin-bottom: 30px;
    }
    .category {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .category-name {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 2px solid #E8281E;
    }
    .item {
      margin-bottom: 12px;
      page-break-inside: avoid;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .item-content {
      flex: 1;
      padding-right: 20px;
    }
    .item-name {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 2px;
    }
    .item-price {
      color: #E8281E;
      font-weight: bold;
      font-size: 14px;
      white-space: nowrap;
    }
    .item-description {
      font-size: 12px;
      color: #666;
      margin-top: 2px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 11px;
      color: #999;
    }
  </style>
</head>
<body>
  <h1>${menuData.restaurant}</h1>
  <div class="location">${menuData.location}</div>
  
  ${menuData.categories.map((category: any) => `
    <div class="category">
      <div class="category-name">${category.name}</div>
      ${category.items.map((item: any) => `
        <div class="item">
          <div class="item-content">
            <div class="item-name">${item.name}</div>
            ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
          </div>
          ${item.price ? `<div class="item-price">$${item.price}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('')}
  
  <div class="footer">
    Powered by Menus Ready<br>
    menusready.com
  </div>
  
  <script>
    // Auto-trigger print dialog
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
    `;

    // Return HTML that will auto-trigger print dialog
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('[Download PDF] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
