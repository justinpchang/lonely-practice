import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account";
import Navbar from "@/components/Navbar";
import Chat from "@/components/Chat/Chat";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <div
          className="container mx-auto"
          style={{ padding: "50px 0 100px 0" }}
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <Navbar />
          <Chat />
        </div>
      )}
    </>
  );
};

export default Home;
