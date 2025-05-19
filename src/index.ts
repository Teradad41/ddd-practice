import { supabase } from "./db";

async function main() {
  try {
    const { data } = await supabase.from("tasks").select("*");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

main();
