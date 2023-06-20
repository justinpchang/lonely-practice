import { Save, Trash2 } from "react-feather";

interface Props {
  entry: {
    id: number;
    original: string;
    context: string;
    translation: string;
  };
}

function HistoryRow({ entry }: Props) {
  const maxChars = 60;
  const originalStartIndex = entry.context.indexOf(entry.original);
  const originalEndIndex = originalStartIndex + entry.original.length;
  const charsRemaining = maxChars - entry.original.length;
  let contextStartIndex = Math.max(
    0,
    originalStartIndex - Math.floor(charsRemaining / 2)
  );
  let contextEndIndex = Math.min(
    entry.context.length,
    originalEndIndex + Math.ceil(charsRemaining / 2)
  );
  let leftEllipses = false;
  let rightEllispes = false;
  if (contextStartIndex > 0) {
    leftEllipses = true;
  }
  if (contextEndIndex < entry.context.length) {
    rightEllispes = true;
  }

  return (
    <li className="flex flex-col p-2 border-b-2">
      <div className="flex items-center gap-2">
        <div className="flex justify-between items-center grow text-xs mr-2">
          <span className="text-slate-200">
            {leftEllipses && "..."}
            {entry.context.slice(contextStartIndex, originalStartIndex)}
            <span className="font-bold text-white">{entry.original}</span>
            {entry.context.slice(originalEndIndex, contextEndIndex)}
            {rightEllispes && "..."}
          </span>
          <span className="">{entry.translation}</span>
        </div>
        <div className="flex flex-col gap-1">
          <Save
            className="cursor-pointer text-white hover:text-green-500"
            size={16}
            onClick={() => alert(`Saving ${entry.original}`)}
          />
          <Trash2
            className="cursor-pointer text-white hover:text-red-500"
            size={16}
            onClick={() => alert(`Deleting ${entry.original}`)}
          />
        </div>
      </div>
    </li>
  );
}

export { HistoryRow };
