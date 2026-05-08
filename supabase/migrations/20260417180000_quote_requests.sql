-- Table for quote/contact requests
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  residence_name text,
  lots_count text,
  message text not null
);

alter table public.quote_requests enable row level security;

-- Anyone (including anonymous visitors) can insert a quote request
create policy "Anyone can submit a quote request"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (true);

-- Only future authenticated admins should read; for now block public reads (no select policy = denied with RLS on)
