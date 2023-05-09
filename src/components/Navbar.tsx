import { Database } from "@/types/supabase.types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Navbar() {
  const supabase = useSupabaseClient<Database>();

  return (
    <div className="w-full bg-slate-700 flex justify-between items-center p-3 px-6">
      <h1 className="text-lg text-white">Lonely Practice</h1>
      <button
        className="text-white hover:text-slate-400"
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
