create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  scholar_id text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, scholar_id)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'scholar_id'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.get_signup_stats()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'signupCount', count(*)::integer,
    'treesPlanted', floor(count(*) / 10)::integer
  )
  from public.profiles
  join auth.users on auth.users.id = public.profiles.id
  where auth.users.email_confirmed_at is not null;
$$;

grant execute on function public.get_signup_stats() to anon, authenticated;
