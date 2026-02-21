-- Add paid tracking fields to restaurants table
alter table restaurants 
  add column if not exists paid boolean default false,
  add column if not exists paid_at timestamp,
  add column if not exists customer_email text;

-- Create index for fast paid lookups
create index if not exists idx_restaurants_paid on restaurants(paid);
create index if not exists idx_restaurants_slug_paid on restaurants(slug, paid);
