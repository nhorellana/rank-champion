-- Add weight column to projects table for custom sorting
ALTER TABLE public.projects 
ADD COLUMN weight INTEGER DEFAULT 999;