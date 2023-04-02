import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account";
import Navbar from "@/components/Navbar";

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
        <>
          <Navbar />
          <div className="container mx-auto mt-6 px-6">
            <Account session={session} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
