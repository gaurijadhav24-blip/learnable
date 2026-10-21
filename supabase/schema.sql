-- ============================================================================
-- LearnAble - Supabase Database Schema
-- Project: Learning Disability Awareness & Support Portal (B.Sc. IT CEA)
-- 
-- HOW TO RUN THIS FILE:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Open your project -> Click "SQL Editor" in the left sidebar.
-- 3. Click "New Query" -> Paste all contents of this file.
-- 4. Click "Run" (green button).
-- 5. You should see: "Success. No rows returned".
-- 
-- This script is 100% SAFE TO RE-RUN (idempotent):
-- - Uses CREATE TABLE IF NOT EXISTS
-- - Uses DROP POLICY IF EXISTS before each CREATE POLICY
-- - Uses ON CONFLICT DO NOTHING for seed data
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. FEEDBACK TABLE
-- Stores user feedback submitted from feedback.html.
-- Name defaults to 'Anonymous', user_type is restricted, rating is 1 to 5.
-- ----------------------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anonymous',
  user_type text not null check (user_type in ('Learner', 'Parent', 'Educator', 'Other')),
  rating int not null check (rating >= 1 and rating <= 5),
  feedback text not null check (char_length(feedback) <= 1000),
  suggestions text check (suggestions is null or char_length(suggestions) <= 500),
  created_at timestamptz not null default now()
);

-- Index for sorting newest feedback first
create index if not exists idx_feedback_created_at on public.feedback(created_at desc);


-- ----------------------------------------------------------------------------
-- 2. RESOURCES TABLE
-- Stores verified support organizations and learning materials for resources.html.
-- ----------------------------------------------------------------------------
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Assessment', 'Learning Support', 'Parent Support', 'Teacher Support', 'Inclusive Education', 'Awareness')),
  description text not null,
  website text not null,
  source text not null,
  verification_date date not null default current_date,
  status text not null default 'Verified',
  created_at timestamptz not null default now()
);

create index if not exists idx_resources_category on public.resources(category);


-- ----------------------------------------------------------------------------
-- 3. QUIZ QUESTIONS & OPTIONS TABLES
-- Stores questions and multiple choice options for activities.html.
-- On question delete, options cascade-delete automatically.
-- ----------------------------------------------------------------------------
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  sort_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  sort_order int not null default 1
);

create index if not exists idx_quiz_options_question_id on public.quiz_options(question_id);


-- ----------------------------------------------------------------------------
-- 4. QUIZ ATTEMPTS TABLE
-- Stores anonymous quiz completion stats (no personal data/PII collected).
-- ----------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  score int not null,
  total int not null,
  percentage int not null,
  user_type text default 'General Learner',
  answers jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_quiz_attempts_created_at on public.quiz_attempts(created_at desc);


-- ----------------------------------------------------------------------------
-- 5. ADMINS TABLE & HELPER FUNCTION
-- References auth.users. Only users present in this table can access admin dashboard.
-- ----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Helper function to check if the currently authenticated user is an admin
-- SECURITY DEFINER allows it to run with elevated permissions to check admins table
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;


-- ----------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures data protection:
-- - Public can read resources and quiz
-- - Public can submit feedback and quiz results
-- - Only admins can view feedback, view quiz attempts, and edit resources/quiz
-- ----------------------------------------------------------------------------

-- Enable RLS on all tables
alter table public.feedback enable row level security;
alter table public.resources enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_options enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.admins enable row level security;


-- FEEDBACK POLICIES
drop policy if exists "Anyone can submit feedback" on public.feedback;
create policy "Anyone can submit feedback"
  on public.feedback
  for insert
  to anon, authenticated
  with check (
    rating between 1 and 5
    and char_length(feedback) <= 1000
    and (suggestions is null or char_length(suggestions) <= 500)
  );

drop policy if exists "Admins can view feedback" on public.feedback;
create policy "Admins can view feedback"
  on public.feedback
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can delete feedback" on public.feedback;
create policy "Admins can delete feedback"
  on public.feedback
  for delete
  to authenticated
  using (public.is_admin());


-- RESOURCES POLICIES
drop policy if exists "Everyone can view verified resources" on public.resources;
create policy "Everyone can view verified resources"
  on public.resources
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert resources" on public.resources;
create policy "Admins can insert resources"
  on public.resources
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update resources" on public.resources;
create policy "Admins can update resources"
  on public.resources
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete resources" on public.resources;
create policy "Admins can delete resources"
  on public.resources
  for delete
  to authenticated
  using (public.is_admin());


-- QUIZ QUESTIONS POLICIES
drop policy if exists "Everyone can view active quiz questions" on public.quiz_questions;
create policy "Everyone can view active quiz questions"
  on public.quiz_questions
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert quiz questions" on public.quiz_questions;
create policy "Admins can insert quiz questions"
  on public.quiz_questions
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update quiz questions" on public.quiz_questions;
create policy "Admins can update quiz questions"
  on public.quiz_questions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete quiz questions" on public.quiz_questions;
create policy "Admins can delete quiz questions"
  on public.quiz_questions
  for delete
  to authenticated
  using (public.is_admin());


-- QUIZ OPTIONS POLICIES
drop policy if exists "Everyone can view quiz options" on public.quiz_options;
create policy "Everyone can view quiz options"
  on public.quiz_options
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert quiz options" on public.quiz_options;
create policy "Admins can insert quiz options"
  on public.quiz_options
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update quiz options" on public.quiz_options;
create policy "Admins can update quiz options"
  on public.quiz_options
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete quiz options" on public.quiz_options;
create policy "Admins can delete quiz options"
  on public.quiz_options
  for delete
  to authenticated
  using (public.is_admin());


-- QUIZ ATTEMPTS POLICIES
drop policy if exists "Anyone can submit quiz attempts" on public.quiz_attempts;
create policy "Anyone can submit quiz attempts"
  on public.quiz_attempts
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can view quiz attempts" on public.quiz_attempts;
create policy "Admins can view quiz attempts"
  on public.quiz_attempts
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can delete quiz attempts" on public.quiz_attempts;
create policy "Admins can delete quiz attempts"
  on public.quiz_attempts
  for delete
  to authenticated
  using (public.is_admin());


-- ADMINS POLICIES
drop policy if exists "Logged in users can check their own admin status" on public.admins;
create policy "Logged in users can check their own admin status"
  on public.admins
  for select
  to authenticated
  using (auth.uid() = user_id);


-- ----------------------------------------------------------------------------
-- 7. SEED DATA
-- Default resources and quiz questions.
-- Uses fixed deterministic UUIDs so re-running this file does not duplicate data.
-- ----------------------------------------------------------------------------

-- Seed 6 Verified Resources
insert into public.resources (id, name, category, description, website, source, verification_date, status)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'National Center for Learning Disabilities (NCLD)',
    'Assessment',
    'Authoritative information about assessment, identification, early screening, and support for learning differences.',
    'https://www.ncld.org',
    'NCLD',
    '2024-09-01',
    'Verified'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'International Dyslexia Association',
    'Awareness',
    'Global non-profit providing evidence-based research, structured literacy guides, and awareness regarding dyslexia.',
    'https://dyslexiaida.org',
    'IDA',
    '2024-09-01',
    'Verified'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Learning Disabilities Association of America',
    'Learning Support',
    'Comprehensive support resources, study tips, advocacy, and guidance for learners, parents, and educators.',
    'https://ldaamerica.org',
    'LDA',
    '2024-09-01',
    'Verified'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Understood - Learning and Thinking Differences',
    'Parent Support',
    'Practical strategies and expert guidance for parents navigating ADHD, dyslexia, and executive function challenges.',
    'https://www.understood.org',
    'Understood',
    '2024-09-01',
    'Verified'
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'NIEPID - Inclusive Education & Learning Disability Resources',
    'Teacher Support',
    'National Institute for the Empowerment of Persons with Intellectual Disabilities (Govt. of India) providing screening tools, teacher guidelines, and curriculum adaptations.',
    'https://niepid.nic.in',
    'NIEPID, Govt of India',
    '2024-09-01',
    'Verified'
  ),
  (
    '10000000-0000-0000-0000-000000000006',
    'UNESCO Inclusive Education Framework',
    'Inclusive Education',
    'International guidelines, policy frameworks, and best practices for creating accessible, inclusive education systems.',
    'https://en.unesco.org/themes/inclusion-education',
    'UNESCO',
    '2024-09-01',
    'Verified'
  )
on conflict (id) do nothing;


-- Seed 10 Quiz Questions
insert into public.quiz_questions (id, question, sort_order, is_active)
values
  ('20000000-0000-0000-0000-000000000001', 'What is a learning disability?', 1, true),
  ('20000000-0000-0000-0000-000000000002', 'True or False: A learning disability means a person is not intelligent.', 2, true),
  ('20000000-0000-0000-0000-000000000003', 'Which of the following is a common learning area that may need support?', 3, true),
  ('20000000-0000-0000-0000-000000000004', 'What should happen when a learner shows persistent difficulty?', 4, true),
  ('20000000-0000-0000-0000-000000000005', 'Can this website diagnose a learning disability?', 5, true),
  ('20000000-0000-0000-0000-000000000006', 'Which of these is a helpful teaching strategy for learners with reading difficulties?', 6, true),
  ('20000000-0000-0000-0000-000000000007', 'How can parents best support a child with learning difficulties?', 7, true),
  ('20000000-0000-0000-0000-000000000008', 'What is differentiated learning?', 8, true),
  ('20000000-0000-0000-0000-000000000009', 'When should a learner seek professional guidance for learning difficulties?', 9, true),
  ('20000000-0000-0000-0000-000000000010', 'What is NOT a sign of a learning disability?', 10, true)
on conflict (id) do nothing;


-- Seed Options for Question 1
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'A sign of low intelligence', false, 1),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'A difference in how a person processes information', true, 2),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Something that only affects reading', false, 3),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'A temporary difficulty that always goes away', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 2
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000002', 'True', false, 1),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000002', 'False', true, 2)
on conflict (id) do nothing;

-- Seed Options for Question 3
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000003', 'Reading', true, 1),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000003', 'Being happy', false, 2),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000003', 'Playing sports', false, 3),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000003', 'Eating healthy', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 4
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000004', 'Ignore it and hope it goes away', false, 1),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000004', 'Consider talking to a parent, teacher, or professional', true, 2),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000004', 'Label the child as having a disability immediately', false, 3),
  ('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000004', 'Give up on the learner', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 5
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000005', 'Yes, this website can diagnose', false, 1),
  ('30000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000005', 'No, only qualified professionals can diagnose', true, 2),
  ('30000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000005', 'Maybe, depending on the results', false, 3),
  ('30000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000005', 'Teachers can diagnose on this website', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 6
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000019', '20000000-0000-0000-0000-000000000006', 'Guided reading and repeated practice', true, 1),
  ('30000000-0000-0000-0000-000000000020', '20000000-0000-0000-0000-000000000006', 'Criticizing mistakes loudly', false, 2),
  ('30000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000006', 'Giving very complex texts', false, 3),
  ('30000000-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000006', 'Avoiding all support', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 7
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000007', 'Use positive communication and break tasks into smaller steps', true, 1),
  ('30000000-0000-0000-0000-000000000024', '20000000-0000-0000-0000-000000000007', 'Compare the child to other students', false, 2),
  ('30000000-0000-0000-0000-000000000025', '20000000-0000-0000-0000-000000000007', 'Do all the work for the child', false, 3),
  ('30000000-0000-0000-0000-000000000026', '20000000-0000-0000-0000-000000000007', 'Use harsh language to motivate them', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 8
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000027', '20000000-0000-0000-0000-000000000008', 'Teaching all students the same way', false, 1),
  ('30000000-0000-0000-0000-000000000028', '20000000-0000-0000-0000-000000000008', 'Adjusting content and methods to match different learner needs', true, 2),
  ('30000000-0000-0000-0000-000000000029', '20000000-0000-0000-0000-000000000008', 'Only helping struggling students', false, 3),
  ('30000000-0000-0000-0000-000000000030', '20000000-0000-0000-0000-000000000008', 'Teaching different subjects', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 9
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000031', '20000000-0000-0000-0000-000000000009', 'After one bad test', false, 1),
  ('30000000-0000-0000-0000-000000000032', '20000000-0000-0000-0000-000000000009', 'When difficulties persist over time despite support', true, 2),
  ('30000000-0000-0000-0000-000000000033', '20000000-0000-0000-0000-000000000009', 'Never', false, 3),
  ('30000000-0000-0000-0000-000000000034', '20000000-0000-0000-0000-000000000009', 'Only if the teacher says so', false, 4)
on conflict (id) do nothing;

-- Seed Options for Question 10
insert into public.quiz_options (id, question_id, option_text, is_correct, sort_order)
values
  ('30000000-0000-0000-0000-000000000035', '20000000-0000-0000-0000-000000000010', 'Difficulty with spelling', false, 1),
  ('30000000-0000-0000-0000-000000000036', '20000000-0000-0000-0000-000000000010', 'Difficulty understanding instructions', false, 2),
  ('30000000-0000-0000-0000-000000000037', '20000000-0000-0000-0000-000000000010', 'Sometimes forgetting homework', true, 3),
  ('30000000-0000-0000-0000-000000000038', '20000000-0000-0000-0000-000000000010', 'Persistent difficulty with reading', false, 4)
on conflict (id) do nothing;


-- ============================================================================
-- HOW TO CREATE YOUR FIRST ADMIN USER:
-- ----------------------------------------------------------------------------
-- 1. In your Supabase Dashboard, go to "Authentication" -> "Users".
-- 2. Click "Add user" -> "Create new user".
-- 3. Enter your email and a secure password. Make sure "Auto Confirm User" is checked.
-- 4. Click "Create user".
-- 5. Copy the "UID" (looks like: a1b2c3d4-e5f6-7890-abcd-ef1234567890).
-- 6. Go to "SQL Editor", click "New Query", paste and run:
--
--    insert into public.admins (user_id) values ('PASTE_YOUR_COPIED_UID_HERE');
--
-- 7. You can now log in at login.html using that email & password to access admin.html!
-- ============================================================================
