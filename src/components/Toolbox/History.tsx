import { useHistoryStore } from "@/stores/useHistoryStore";
import { HistoryRow } from "./HistoryRow";

function History() {
  const history = useHistoryStore((state) => state.history);

  return (
    <ul className="w-full h-full">
      {history.map((entry) => (
        <HistoryRow key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}

export { History };
