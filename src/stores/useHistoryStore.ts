import { create } from "zustand";

export interface HistoryEntry {
  id: number;
  original: string;
  context: string;
  translation: string;
}

interface HistoryState {
  history: HistoryEntry[];
  addToHistory: (entry: HistoryEntry) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addToHistory: (entry) =>
    set((state) => ({ history: [...state.history, entry] })),
}));

export { useHistoryStore };
