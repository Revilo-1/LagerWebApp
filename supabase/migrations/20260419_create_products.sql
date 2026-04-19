create table if not exists public.products (
  id uuid primary key,
  name text not null,
  category text not null,
  added_date date not null default current_date,
  cost_price numeric(12, 2),
  estimated_value numeric(12, 2) not null default 0,
  sold_price numeric(12, 2),
  status text not null check (status in ('Opslåt', 'Solgt')),
  description text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.products disable row level security;
