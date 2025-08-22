-- Add comment and betting fields to scores table
ALTER TABLE public.scores 
ADD COLUMN comment TEXT,
ADD COLUMN me_la_juego BOOLEAN DEFAULT false;