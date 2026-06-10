-- ==============================================================
-- DATABASE SCHEMA: CareerAI Platform
-- Paste this script into the Supabase SQL Editor to initialize.
-- ==============================================================

-- 1. Create Public Users Table (stores profiles linked to auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null unique,
  photo text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Assessments Table (stores diagnostic results)
create table public.assessments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  answers jsonb not null,
  career_scores jsonb not null,
  top_match jsonb not null,
  top_score integer not null,
  domain_scores jsonb not null,
  points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Saved Reports Table (saved matches with custom notes)
create table public.saved_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  career_id text not null,
  career_name text not null,
  match_percentage integer not null,
  notes text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, career_id)
);

-- 4. Create Preferences Table (tracks target skills progress and certification milestones)
create table public.preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade unique not null,
  career_id text not null,
  skills_progress jsonb not null default '{}'::jsonb,
  certifications_status jsonb not null default '{}'::jsonb,
  goals text[] default '{}'::text[],
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================
-- AUTOMATIC PROFILE SYNCHRONIZATION
-- Creates a row in public.users whenever a user registers.
-- ==============================================================

create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_first_user boolean;
  assigned_role text;
  avatar_seed text;
begin
  -- Check if this is the first user registered (promoted to admin)
  select count(*) = 0 into is_first_user from public.users;
  if is_first_user then
    assigned_role := 'admin';
  else
    assigned_role := 'user';
  end if;

  -- Create a random seed seed name
  avatar_seed := coalesce(new.raw_user_meta_data->>'name', 'User');

  insert into public.users (id, name, email, photo, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'User Account'),
    new.email,
    'https://api.dicebear.com/7.x/adventurer/svg?seed=' || urlencode(avatar_seed),
    assigned_role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================

alter table public.users enable row level security;
alter table public.assessments enable row level security;
alter table public.saved_reports enable row level security;
alter table public.preferences enable row level security;

-- Users Table Policies
create policy "Allow public read-access to profiles" on public.users
  for select using (true);

create policy "Allow users to update own profiles" on public.users
  for update using (auth.uid() = id);

-- Assessments Table Policies
create policy "Allow users to read own assessments" on public.assessments
  for select using (auth.uid() = user_id or (select role from public.users where id = auth.uid()) = 'admin');

create policy "Allow users to insert own assessments" on public.assessments
  for insert with check (auth.uid() = user_id);

-- Saved Reports Table Policies
create policy "Allow users to manage own saved reports" on public.saved_reports
  for all using (auth.uid() = user_id);

-- Preferences Table Policies
create policy "Allow users to manage own preferences/progress" on public.preferences
  for all using (auth.uid() = user_id);
