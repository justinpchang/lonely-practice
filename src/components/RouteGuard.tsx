import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const authCheck = (url: string) => {
      // TODO: Create dedicated login route
      const publicPaths = ["/"];
      const path = url.split("?")[0];
      console.log(user);
      if (!user && !publicPaths.includes(path)) {
        router.push("/");
      }
    };

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [user, router]);

  return children;
}

export { RouteGuard };
