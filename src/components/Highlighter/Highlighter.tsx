import { getTranslation } from "@/requests/translation";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  className: string;
  children: ReactNode;
}

function Highlighter({ className, children }: Props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [shouldShowPopover, setShouldShowPopover] = useState(false);
  const [popoverText, setPopoverText] = useState("");

  const highlight = useRef<HTMLDivElement>(null);

  const hidePopover = () => {
    setShouldShowPopover(false);
  };

  const handleMouseUp = async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (!selectedText) {
      hidePopover();
      return;
    }

    const selectionRange = selection?.getRangeAt(0)!;
    const startNode = selectionRange.startContainer.parentNode;
    const endNode = selectionRange.endContainer.parentNode;

    const highlightable = highlight.current;
    const highlightableRegion = highlightable?.querySelector(".h-popable");

    if (highlightableRegion) {
      if (
        !highlightableRegion.contains(startNode) ||
        !highlightableRegion.contains(endNode)
      ) {
        hidePopover();
        return;
      }
    } else if (
      !highlightable?.contains(startNode) ||
      !highlightable?.contains(endNode)
    ) {
      hidePopover();
      return;
    }

    if (!startNode?.isSameNode(endNode)) {
      hidePopover();
      return;
    }

    const { x, y, width } = selectionRange.getBoundingClientRect();
    if (!width) {
      hidePopover();
      return;
    }

    const translation = await getTranslation(selectedText, "en");

    setX(x + width / 2);
    setY(y + window.scrollY - 10);
    setPopoverText(translation);
    setShouldShowPopover(true);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div ref={highlight} className={className}>
      {shouldShowPopover && (
        <div
          className="h-popover"
          style={{ left: `${x}px`, top: `${y}px` }}
          role="presentation"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div role="button" className="text-white">
            {popoverText}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export { Highlighter };
