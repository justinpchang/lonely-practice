import React, { useEffect, useState } from "react";
import { SidebarRow } from "./SidebarRow";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Copy, Home, MessageSquare } from "react-feather";
import { NewChatModal } from "../library/modals/NewChatModal";

function Sidebar() {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const client = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/chat") {
      setIsNewChatModalOpen(true);
    }
  }, [router.pathname]);

  const signOut = async () => {
    await client.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {isNewChatModalOpen && (
        <NewChatModal
          isOpen={isNewChatModalOpen}
          onClose={() => setIsNewChatModalOpen(false)}
        />
      )}
      <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
        <div className="flex items-center">
          <Link
            className="p-2 text-xl font-bold text-white hover:text-cyan-300"
            href="/"
          >
            Lonely Practice
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between mt-6">
          <ul className="pt-2 pb-4 space-y-1">
            <SidebarRow href="/">
              <Home color="white" />
              Home
            </SidebarRow>
            <SidebarRow onClick={() => setIsNewChatModalOpen(true)}>
              <MessageSquare color="white" />
              New Chat
            </SidebarRow>
            <SidebarRow href="/deck">
              <Copy color="white" />
              Deck
            </SidebarRow>
          </ul>
          <ul className="pt-2 pb-4 space-y-1">
            <SidebarRow href="/about">About</SidebarRow>
            <SidebarRow onClick={signOut}>Sign out</SidebarRow>
          </ul>
        </div>
      </div>
    </>
  );
}

export { Sidebar };
