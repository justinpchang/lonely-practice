import { ReactNode } from "react";

interface Props {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}
function ToolboxTab({ isActive, onClick, children }: Props) {
  return (
    <button
      className={`px-2 py-1 mr-1 hover:bg-blue-700 rounded-t-xl ${
        isActive ? `bg-blue-600 border-b-2` : ``
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ToolboxTab;
