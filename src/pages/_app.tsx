import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/chat.scss";
import { RouteGuard } from "@/components/RouteGuard";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionContextProvider>
  );
}
