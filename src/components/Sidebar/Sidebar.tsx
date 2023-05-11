import React from "react";
import { SidebarRow } from "./SidebarRow";
import Link from "next/link";

function Sidebar() {
  return (
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
          <SidebarRow name="Home" href="/" />
          <SidebarRow name="Chat" href="/chat" />
          <SidebarRow name="Deck" href="/deck" />
        </ul>
        <ul className="pt-2 pb-4 space-y-1">
          <SidebarRow name="About" href="/about" />
          <SidebarRow name="Sign out" href="#" />
        </ul>
      </div>
    </div>
  );
}

export { Sidebar };
