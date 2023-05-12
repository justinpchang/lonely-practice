import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Sidebar } from "@/components/Sidebar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Home = () => {
  const user = useUser();
  const client = useSupabaseClient();

  return (
    <>
      {user ? (
        <div className="flex">
          <Sidebar />
          <div className="container flex justify-center items-center">
            <h1>This is the home page</h1>
          </div>
        </div>
      ) : (
        <div
          className="container mx-auto"
          style={{ padding: "50px 0 100px 0" }}
        >
          <Auth
            supabaseClient={client}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        </div>
      )}
    </>
  );
};

export default Home;
