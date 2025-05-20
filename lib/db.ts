import { createClient } from "@supabase/supabase-js";

const connectionString = process.env.DATABASE_URL;
const SERVICE_KEY = process.env.SERVICE_KEY; // supabaseKey では無理だった

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

if (!SERVICE_KEY) {
  throw new Error("ANON_KEY is not defined");
}

const supabase = createClient(connectionString, SERVICE_KEY);

export { supabase };
