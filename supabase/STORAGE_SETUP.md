# Supabase Storage Setup

## Create Storage Bucket

Run this SQL in your Supabase SQL Editor:

```sql
-- 1. Create 'menus' bucket (public access for downloads)
insert into storage.buckets (id, name, public)
values ('menus', 'menus', true);

-- 2. Allow public read access to all files
create policy "Public read access to menus"
on storage.objects for select
using ( bucket_id = 'menus' );

-- 3. Allow authenticated uploads (for webhook)
create policy "Authenticated upload to menus"
on storage.objects for insert
with check ( 
  bucket_id = 'menus' 
  and auth.role() = 'authenticated'
);

-- 4. Allow service role to upsert (update existing files)
create policy "Service role upsert to menus"
on storage.objects for update
using ( bucket_id = 'menus' );
```

## Verify Setup

```sql
-- Check bucket exists
SELECT * FROM storage.buckets WHERE id = 'menus';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

## File Structure

Files will be organized by restaurant slug:

```
menus/
  └── sarinanas-tamale-factory-santa-ana/
      ├── qr-code.png
      ├── menu.txt
      ├── menu.pdf (TODO)
      └── menu.jpg (TODO)
```

## Access URLs

Files are publicly accessible at:
```
https://[your-project-ref].supabase.co/storage/v1/object/public/menus/[slug]/[filename]
```

Example:
```
https://abc123.supabase.co/storage/v1/object/public/menus/sarinanas-tamale-factory-santa-ana/qr-code.png
```

## Environment Variables

Make sure these are set in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

The webhook uses these to upload files after payment.
