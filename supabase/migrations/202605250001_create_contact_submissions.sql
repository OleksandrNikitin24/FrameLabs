create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  subject text not null check (
    subject in (
      'Technical Support',
      'Billing & Account',
      'Privacy Request',
      'Partnership Inquiry',
      'Other'
    )
  ),
  message text not null check (char_length(message) between 10 and 4000),
  delivery_status text not null default 'pending' check (
    delivery_status in ('pending', 'delivered', 'failed')
  ),
  resend_message_id text,
  delivery_error text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create index if not exists contact_submissions_email_created_at_idx
  on public.contact_submissions (email, created_at desc);
