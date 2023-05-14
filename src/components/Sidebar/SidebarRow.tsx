import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  onClick?: () => void;
  children: ReactNode;
}

function SidebarRow({ href, onClick, children }: Props) {
  return (
    <li className="rounded-sm text-lg hover:bg-gray-700" onClick={onClick}>
      <Link
        href={href}
        className="flex gap-4 items-center p-2 space-x-3 rounded-md text-gray-100"
      >
        {children}
      </Link>
    </li>
  );
}

export { SidebarRow };
