import { TABS, TOOLBOX_ANIMATION } from "@/constants/toolbox";
import { Dictionary } from "./Dictionary";
import ToolboxTab from "./ToolboxTab";
import { useState } from "react";

interface Props {
  isOpen: boolean;
}

function Toolbox({ isOpen }: Props) {
  const [currentTab, setCurrentTab] = useState<(typeof TABS)[0]>(TABS[0]);

  return (
    <div
      className={`flex flex-col top-0 right-0 w-80 bg-blue-800 text-white fixed h-full ${
        isOpen ? "translate-x-0 " : "translate-x-full"
      } ${TOOLBOX_ANIMATION}`}
    >
      <div className="flex pt-2">
        {TABS.map(({ name }) => (
          <ToolboxTab
            key={name}
            isActive={currentTab.name === name}
            onClick={() =>
              setCurrentTab(TABS.find((tab) => tab.name === name)!)
            }
          >
            {name}
          </ToolboxTab>
        ))}
      </div>
      <div className="flex-1">
        {TABS.map(({ name, Component }) => (
          <div
            key={`compoent-${name}`}
            className={`h-full ${currentTab.name === name ? "" : "hidden"}`}
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Toolbox };
