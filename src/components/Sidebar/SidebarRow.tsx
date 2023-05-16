import Link from "next/link";
import React, { ReactNode } from "react";

const ROW_STYLES =
  "flex gap-4 items-center p-2 space-x-3 rounded-md text-gray-100 cursor-pointer";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}

function SidebarRow({ href, onClick, children }: Props) {
  return (
    <li className="rounded-sm text-lg hover:bg-gray-700" onClick={onClick}>
      {href ? (
        <Link href={href} className={ROW_STYLES}>
          {children}
        </Link>
      ) : (
        <div className={ROW_STYLES}>{children}</div>
      )}
    </li>
  );
}

export { SidebarRow };
