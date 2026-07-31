create extension if not exists pgcrypto;

create table if not exists public.annotations (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_session_id uuid not null,
  page_title text not null,
  page_url text not null,
  page_slug text not null,
  heading_text text,
  heading_level text,
  heading_id text,
  quote text not null,
  prefix text not null,
  suffix text not null,
  text_start integer not null,
  text_end integer not null,
  comment text not null,
  display_name text,
  client_sent_at timestamptz,
  client_time_zone text,
  email_status text not null default 'pending'
    check (email_status in ('pending', 'sent', 'failed')),
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists annotations_user_created_at_idx
  on public.annotations (user_id, created_at desc)
  where user_id is not null;

alter table public.annotations enable row level security;

create policy "Users can read their own annotations"
  on public.annotations
  for select
  to authenticated
  using (auth.uid() = user_id);

comment on table public.annotations is
  'Private text annotations submitted from the Quartz site. Inserts go through the Edge Function.';
