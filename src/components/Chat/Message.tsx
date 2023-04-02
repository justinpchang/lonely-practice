import { ReactNode } from "react";

interface Props {
  isFromUser: boolean;
  children: ReactNode;
}

export default function Message({ isFromUser, children }: Props) {
  return (
    <div
      className={`${isFromUser ? "bg-white" : "bg-slate-50"} flex gap-3 p-6`}
    >
      <div className="h-10 w-10 bg-slate-600 text-sm text-white flex items-center justify-center">
        {isFromUser ? "You" : "AI"}
      </div>
      <div className="mt-1 text-slate-600 text-lg">{children}</div>
    </div>
  );
}
