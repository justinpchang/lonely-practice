import { TOOLBOX_ANIMATION, TOOLBOX_WIDTH } from "@/constants/toolbox";

interface Props {
  isOpen: boolean;
}

function Toolbox({ isOpen }: Props) {
  return (
    <div
      className={`flex flex-col top-0 right-0 w-[${TOOLBOX_WIDTH}] bg-blue-600 text-white fixed h-full ${
        isOpen ? "translate-x-0 " : "translate-x-full"
      } ${TOOLBOX_ANIMATION}`}
    >
      <h2 className="text-4xl font-semibold text-white">Toolbox</h2>
      <iframe
        className="flex-1"
        src="https://www.wordreference.com/fren/bonjour"
      />
    </div>
  );
}

export { Toolbox };
