export const advancedGames = [
  {
    id: "bughunt",
    number: "01",
    title: "Bug Hunt",
    subtitle: "Repère l'erreur dans le code",
    icon: "grid",
    tone: "cyan",
  },
  {
    id: "binary",
    number: "02",
    title: "Binary Gate",
    subtitle: "Décode le signal binaire",
    icon: "xo",
    tone: "violet",
  },
  {
    id: "algorithm",
    number: "03",
    title: "Algo Flow",
    subtitle: "Analyse la logique algorithmique",
    icon: "cards",
    tone: "blue",
  },
  {
    id: "sql",
    number: "04",
    title: "SQL Quest",
    subtitle: "Interroge la base de données",
    icon: "pulse",
    tone: "coral",
  },
  {
    id: "console",
    number: "05",
    title: "Console",
    subtitle: "Prédit la sortie du programme",
    icon: "odd",
    tone: "lime",
  },
];

export const beginnerGames = [
  {
    id: "tictactoe",
    number: "01",
    title: "Morpion",
    subtitle: "Aligne trois symboles",
    icon: "xo",
    tone: "violet",
  },
  {
    id: "memory",
    number: "02",
    title: "Mémoire",
    subtitle: "Retrouve toutes les paires",
    icon: "cards",
    tone: "blue",
  },
  {
    id: "flashcode",
    number: "03",
    title: "Code secret",
    subtitle: "Mémorise quatre chiffres",
    icon: "pulse",
    tone: "coral",
  },
  {
    id: "sudoku",
    number: "04",
    title: "Mini Sudoku",
    subtitle: "Complète avec 1, 2 et 3",
    icon: "grid",
    tone: "cyan",
  },
  {
    id: "oddone",
    number: "05",
    title: "L'intrus",
    subtitle: "Trouve la forme différente",
    icon: "odd",
    tone: "lime",
  },
];
export const allGames = [
  ...advancedGames,
  ...beginnerGames.filter((g) => !advancedGames.some((x) => x.id === g.id)),
];

export const GAME_COUNT = 5;
