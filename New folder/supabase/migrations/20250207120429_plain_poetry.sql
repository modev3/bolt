/*
  # Initial Schema Setup for Trend Analyzer

  1. New Tables
    - `profiles`
      - User profile information
      - Linked to auth.users
    - `analyses`
      - Stores trend analysis results
      - Links to user profiles
    - `saved_topics`
      - Bookmarked topics for future reference
      - Links to user profiles

  2. Security
    - RLS enabled on all tables
    - Policies for user data access
*/

-- Create a function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id uuid UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analyses table
CREATE TABLE IF NOT EXISTS public.analyses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  topic text NOT NULL,
  analysis_result text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create saved_topics table
CREATE TABLE IF NOT EXISTS public.saved_topics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  topic text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create updated_at trigger for profiles
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_topics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid());

-- Analyses policies
CREATE POLICY "Users can view own analyses"
  ON public.analyses FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT id FROM public.profiles WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can create analyses"
  ON public.analyses FOR INSERT
  TO authenticated
  WITH CHECK (user_id IN (
    SELECT id FROM public.profiles WHERE auth_id = auth.uid()
  ));

-- Saved topics policies
CREATE POLICY "Users can view own saved topics"
  ON public.saved_topics FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT id FROM public.profiles WHERE auth_id = auth.uid()
  ));

CREATE POLICY "Users can manage saved topics"
  ON public.saved_topics FOR ALL
  TO authenticated
  USING (user_id IN (
    SELECT id FROM public.profiles WHERE auth_id = auth.uid()
  ));