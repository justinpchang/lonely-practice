import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/chat.scss";
import { Sidebar } from "@/components/Sidebar";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <div className="flex">
        <Sidebar />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionContextProvider>
  );
}
