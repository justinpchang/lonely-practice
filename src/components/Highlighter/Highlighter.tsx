import { END_SENTENCE_PUNCTUATION } from "@/constants/languages";
import { useGetLanguage } from "@/hooks/useGetLanguage";
import { getTranslation } from "@/requests/translation";
import { useHistoryStore } from "@/stores/useHistoryStore";
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
  const lastSelectedText = useRef("");

  const { data: language } = useGetLanguage();
  const addToHistory = useHistoryStore((state) => state.addToHistory);

  const hidePopover = () => {
    setShouldShowPopover(false);
  };

  useEffect(() => {
    const handlePointerUp = async () => {
      const selection = window.getSelection();
      if (!selection) return;
      const selectedText = selection.toString().trim();

      if (!selectedText) {
        hidePopover();
        return;
      }

      if (lastSelectedText.current === selectedText) {
        return;
      }
      lastSelectedText.current = selectedText;

      const selectionRange = selection.getRangeAt(0)!;
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

      const translation = await getTranslation(selectedText, language!);

      // Find context of selection
      let startIndex = 0;
      for (let i = selection.anchorOffset - 1; i >= 0; i--) {
        if (
          END_SENTENCE_PUNCTUATION[language!].includes(
            selection.anchorNode!.nodeValue!.charAt(i)!
          )
        ) {
          startIndex = i + 1;
          break;
        }
      }
      let endIndex = 0;
      for (
        let i = selection.focusOffset;
        i < selection.focusNode!.nodeValue!.length;
        i++
      ) {
        if (
          END_SENTENCE_PUNCTUATION[language!].includes(
            selection.focusNode!.nodeValue!.charAt(i)!
          )
        ) {
          endIndex = i + 1;
          break;
        }
      }
      const context = selection
        .anchorNode!.nodeValue!.slice(startIndex, endIndex)
        .trim();

      // Add to history
      addToHistory({
        id: Math.random(), // TODO: (justinpchang) Use id from database
        original: selectedText,
        context,
        translation,
      });

      // Update popover with translation
      setX(x + width / 2);
      setY(y + window.scrollY - 10);
      setPopoverText(translation);
      setShouldShowPopover(true);
    };

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [addToHistory, language]);

  return (
    <div ref={highlight} className={className}>
      {shouldShowPopover && (
        <div
          className="h-popover"
          style={{ left: `${x}px`, top: `${y}px` }}
          role="presentation"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div role="button" className="text-white text-sm">
            {popoverText}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export { Highlighter };
