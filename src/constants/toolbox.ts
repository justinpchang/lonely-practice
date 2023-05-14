import { Dictionary } from "@/components/Toolbox/Dictionary";
import { Words } from "@/components/Toolbox/Words";
import { History } from "@/components/Toolbox/History";

export const TOOLBOX_ANIMATION = "ease-in-out duration-300";

export const TABS: { name: string; Component: () => JSX.Element }[] = [
  {
    name: "Dictionary",
    Component: Dictionary,
  },
  {
    name: "Words",
    Component: Words,
  },
  {
    name: "History",
    Component: History,
  },
];
