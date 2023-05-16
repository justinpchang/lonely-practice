import { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

interface Props {
  variant: "primary" | "secondary" | "danger";
  children: ReactNode;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  variant,
  children,
  disabled,
  type = "button",
  onClick,
}: Props) {
  let custom = "text-white bg-indigo-600 hover:bg-indigo-500";
  switch (variant) {
    case "secondary":
      custom =
        "text-black bg-white hover:bg-gray-50 ring-1 ring-inset ring-gray-300";
      break;
    case "danger":
      custom = "text-white bg-red-600 hover:bg-red-500";
      break;
  }

  return (
    <button
      className={`${custom} ${
        disabled ? "opacity-60 pointer-events-none" : ""
      } inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
