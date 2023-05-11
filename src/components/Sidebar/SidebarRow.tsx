import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  href: string;
}

function SidebarRow({ name, href }: Props) {
  return (
    <li className="rounded-sm text-lg hover:bg-gray-700">
      <Link href={href} className="flex items-center p-2 space-x-3 rounded-md">
        <span className="text-gray-100">{name}</span>
      </Link>
    </li>
  );
}

export { SidebarRow };
