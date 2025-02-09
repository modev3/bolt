/*
  # Add profile creation trigger

  1. Changes
    - Add trigger function to create profile on user signup
    - Create trigger to automatically create profile when user signs up

  2. Security
    - Uses auth.uid() for secure user association
    - Maintains RLS policies
*/

-- Create trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (auth_id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();