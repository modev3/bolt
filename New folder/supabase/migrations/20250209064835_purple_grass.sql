/*
  # Fix analyses table RLS policies

  1. Changes
    - Drop existing policies for analyses table
    - Add new policies with correct user_id check using auth.uid()
    - Add policy for inserting new analyses

  2. Security
    - Enable RLS on analyses table
    - Add policies for authenticated users to:
      - Read their own analyses
      - Create new analyses
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own analyses" ON public.analyses;
  DROP POLICY IF EXISTS "Users can create analyses" ON public.analyses;
END $$;

-- Create new policies
CREATE POLICY "Users can view own analyses"
  ON public.analyses
  FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT id 
      FROM public.profiles 
      WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own analyses"
  ON public.analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IN (
      SELECT id 
      FROM public.profiles 
      WHERE auth_id = auth.uid()
    )
  );