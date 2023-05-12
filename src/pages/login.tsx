import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";

function Login() {
  const client = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) router.push("/");

  return (
    <div className="container mx-auto" style={{ padding: "50px 0 100px 0" }}>
      <Auth
        supabaseClient={client}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </div>
  );
}

export default Login;
