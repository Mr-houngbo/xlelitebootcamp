#!/bin/bash

# Setup script for Supabase database
echo "Setting up XL Elite Bootcamp database..."

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Run the schema
echo "Running schema.sql..."
supabase db push --db-url postgresql://postgres:password@localhost:5432/postgres --schema supabase/schema.sql

echo "Database setup complete!"
