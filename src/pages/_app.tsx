import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/chat.scss";
import { RouteGuard } from "@/components/RouteGuard";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/Sidebar";
import { publicPaths } from "@/constants/publicPaths";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const router = useRouter();

  const shouldShowSidebar = !publicPaths.includes(router.pathname);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RouteGuard>
        <div className="flex w-full">
          {shouldShowSidebar && <Sidebar />}
          <div className="container">
            <Component {...pageProps} />
          </div>
        </div>
      </RouteGuard>
    </SessionContextProvider>
  );
}
