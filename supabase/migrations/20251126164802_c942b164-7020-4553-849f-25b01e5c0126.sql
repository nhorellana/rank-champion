-- Make category, problem, and tags optional in projects table
ALTER TABLE public.projects 
  ALTER COLUMN category DROP NOT NULL,
  ALTER COLUMN problem DROP NOT NULL,
  ALTER COLUMN tags DROP NOT NULL;