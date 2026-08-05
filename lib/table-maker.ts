import { supabase } from "./supabase";

export async function createTableIfNotExists(tableName: string) {
  try {
    console.log(`Checking table existence: ${tableName}...`);
    
    // Table initialization logic
    const { error } = await supabase.rpc("check_table_exists", {
      target_table: tableName,
    });

    if (error) {
      console.error(`Error initializing table (${tableName}):`, error.message);
      return false;
    }

    console.log(`Table (${tableName}) verified successfully.`);
    return true;
  } catch (err) {
    console.error("An unexpected error occurred during table setup:", err);
    return false;
  }
}
