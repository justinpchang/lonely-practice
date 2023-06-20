import { HistoryRow } from "./HistoryRow";

function History() {
  const entries = [
    {
      id: 1,
      original: "Bonjour",
      context: "Bonjour, comment ça va ?",
      translation: "Hello",
    },
    {
      id: 2,
      original: "Au revoir",
      context: "Au revoir, à demain !",
      translation: "Goodbye",
    },
    {
      id: 3,
      original: "Merci",
      context: "Merci beaucoup !",
      translation: "Thank you",
    },
    {
      id: 4,
      original: "bibliotheque",
      context:
        "Ce matin, je suis énergée, donc je pense que je vais à la bibliotheque parce que la bibliotheque est le meilleur endroit pour étudier.",
      translation: "library",
    },
  ];

  return (
    <ul className="w-full h-full">
      {entries.map((entry) => (
        <HistoryRow key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}

export { History };
