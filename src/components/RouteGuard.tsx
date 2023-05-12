import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: JSX.Element }) {
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    // TODO: Create dedicated login route
    const publicPaths = ["/"];
    const path = url.split("?")[0];
    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push("/");
    } else {
      setAuthorized(true);
    }
  };

  return authorized ? children : null;
}

export { RouteGuard };
