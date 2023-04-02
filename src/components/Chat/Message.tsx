import { ReactNode } from "react";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";

interface Props {
  isFromUser: boolean;
  children: ReactNode;
}

export default function Message({ isFromUser, children }: Props) {
  return (
    <div
      className={`${isFromUser ? "bg-white" : "bg-slate-50"} flex gap-3 p-6`}
    >
      {isFromUser ? (
        <div className="h-10 w-10 bg-cyan-700 text-sm text-white flex items-center justify-center">
          You
        </div>
      ) : (
        <div className="h-10 w-10 bg-slate-600 text-white flex items-center justify-center">
          <ComputerDesktopIcon className="h-6 w-6" />
        </div>
      )}
      <div className="mt-1 text-slate-600 text-lg">{children}</div>
    </div>
  );
}
