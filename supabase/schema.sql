-- MenuReady Supabase Schema
-- Run this in your Supabase SQL editor

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  published_at TIMESTAMP DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_slug TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'free', -- 'free', 'paid_onetime', 'paid_subscription'
  stripe_session_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_menus_restaurant_id ON menus(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_customers_restaurant_slug ON customers(restaurant_slug);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Insert Harbor Diner demo data
INSERT INTO restaurants (slug, name, location)
VALUES ('harbor-diner-huntington-beach', 'Harbor Diner', 'Huntington Beach, CA')
ON CONFLICT (slug) DO NOTHING;
