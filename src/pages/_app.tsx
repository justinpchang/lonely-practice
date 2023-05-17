import React, { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";

import "@/styles/globals.css";
import "@/styles/chat.scss";
import "@/styles/highlighter.scss";

import { RouteGuard } from "@/components/RouteGuard";
import { useRouter } from "next/router";
import { Sidebar } from "@/components/Sidebar";
import { publicPaths } from "@/constants/publicPaths";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <RouteGuard>
          <div className="flex w-full">
            {shouldShowSidebar && <Sidebar />}
            <div className="w-full">
              <Component {...pageProps} />
            </div>
          </div>
        </RouteGuard>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
