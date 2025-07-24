-- Create projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  problem TEXT NOT NULL,
  proposed_solution TEXT NOT NULL,
  team TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create judges table
CREATE TABLE public.judges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  expertise TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create scores table
CREATE TABLE public.scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  judge_id UUID REFERENCES public.judges(id) ON DELETE CASCADE,
  category_a INTEGER NOT NULL CHECK (category_a >= 1 AND category_a <= 10),
  category_b INTEGER NOT NULL CHECK (category_b >= 1 AND category_b <= 10),
  category_c INTEGER NOT NULL CHECK (category_c >= 1 AND category_c <= 10),
  category_d INTEGER NOT NULL CHECK (category_d >= 1 AND category_d <= 10),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(project_id, judge_id)
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now since no auth is implemented)
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all operations on judges" ON public.judges FOR ALL USING (true);
CREATE POLICY "Allow all operations on scores" ON public.scores FOR ALL USING (true);

-- Create function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for scores table
CREATE TRIGGER update_scores_last_updated
  BEFORE UPDATE ON public.scores
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated_column();