import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import GameForm from "./components/GameForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import GameList from "./components/GameList.jsx";
import Stats from "./components/Stats.jsx";

const initialGames = [
  {
    id: 1,
    title: "Red Dead Redemption 2",
    platform: "PlayStation",
    rating: 10,
    favorite: true,
    adonisReason:
      "Emotional, cinematic, and painfully human. Arthur Morgan might be the greatest protagonist ever: flawed, loyal, and unforgettable.",
    userReason: ""
  },
  {
    id: 2,
    title: "Minecraft",
    platform: "PC",
    rating: 8,
    favorite: false,
    adonisReason:
      "Nostalgic and endlessly creative—every world feels like a new memory. It’s the perfect game for relaxing, building, and getting lost.",
    userReason: ""
  },
  {
    id: 3,
    title: "Blasphemous",
    platform: "PC",
    rating: 7,
    favorite: false,
    adonisReason:
      "A 2D soulslike with punishing combat and haunting, religious imagery. Bosses hit hard, but the wins feel sacred.",
    userReason: ""
  },
  {
    id: 4,
    title: "Lies of P",
    platform: "PlayStation",
    rating: 8,
    favorite: false,
    adonisReason:
      "A great intro to souls games—tight parries and beautiful, moody streets. It balances challenge with a very fair learning curve.",
    userReason: ""
  },
  {
    id: 5,
    title: "FIFA / FC 26",
    platform: "PlayStation",
    rating: 4,
    favorite: false,
    adonisReason:
      "Repetitive loops and heavy monetization take the fun out. It’s flashy, but it often feels pay-to-win.",
    userReason: ""
  },
  {
    id: 6,
    title: "Dragon Ball Sparking Zero",
    platform: "PlayStation",
    rating: 6,
    favorite: false,
    adonisReason:
      "Explosive arena battles packed with fan-service. Wild spectacle over depth, but it’s a blast with friends.",
    userReason: ""
  },
  {
    id: 7,
    title: "Doom Eternal",
    platform: "PC",
    rating: 8,
    favorite: false,
    adonisReason:
      "Super fast-paced and insanely kinetic. The metal soundtrack and movement loop make every fight a power fantasy.",
    userReason: ""
  },
  {
    id: 8,
    title: "Balatro",
    platform: "PC",
    rating: 7,
    favorite: false,
    adonisReason:
      "Roguelike deckbuilder with ridiculous synergies. The 'one more run' loop is dangerously addictive.",
    userReason: ""
  },
  {
    id: 9,
    title: "Ghost of Tsushima",
    platform: "PlayStation",
    rating: 9,
    favorite: false,
    adonisReason:
      "Similar to RDR2 in its quiet roads and small stories. Cinematic duels and serene exploration make it special.",
    userReason: ""
  },
  {
    id: 10,
    title: "God of War (2018)",
    platform: "PlayStation",
    rating: 9,
    favorite: false,
    adonisReason:
      "A powerful father-son story with weighty axe combat. Smart level design and pacing keep it consistently epic.",
    userReason: ""
  },
  {
    id: 11,
    title: "Sifu",
    platform: "PlayStation",
    rating: 8,
    favorite: false,
    adonisReason:
      "A brutal, stylish brawler where aging forces mastery. Every retry makes you a little sharper—and it feels incredible.",
    userReason: ""
  },
  {
    id: 12,
    title: "Mario Kart 8",
    platform: "Switch",
    rating: 7,
    favorite: false,
    adonisReason:
      "Party chaos with razor-sharp racing underneath. Bright tracks and tight drifting keep it timeless.",
    userReason: ""
  },
  {
    id: 13,
    title: "Super Mario 64",
    platform: "Switch",
    rating: 8,
    favorite: false,
    adonisReason:
      "The blueprint for 3D platformers—pure playful movement. A bit of camera jank, but the magic still lands.",
    userReason: ""
  },
  {
    id: 14,
    title: "Terraria",
    platform: "PC",
    rating: 7,
    favorite: false,
    adonisReason:
      "A cozy-to-epic sandbox with satisfying gear and bosses. Building, digging, and progressing just clicks.",
    userReason: ""
  }
];

const PLATFORMS = ["All", "PC", "PlayStation", "Xbox", "Switch", "Other"];

export default function App() {
  const [games, setGames] = useState(initialGames);

  // NEW: track which game's reason panel is open (only one at a time)
  const [openReasonId, setOpenReasonId] = useState(null);

  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [onlyFavs, setOnlyFavs] = useState(false);

  function addGame(game) {
    setGames(prev => [
      { id: Date.now(), favorite: false, adonisReason: "", userReason: "", ...game },
      ...prev
    ]);
  }
  function deleteGame(id) {
    setGames(prev => prev.filter(g => g.id !== id));
    if (openReasonId === id) setOpenReasonId(null);
  }
  function toggleFavorite(id) {
    setGames(prev => prev.map(g => (g.id === id ? { ...g, favorite: !g.favorite } : g)));
  }
  function updateRating(id, rating) {
    setGames(prev => prev.map(g => (g.id === id ? { ...g, rating } : g)));
  }
  function updateUserReason(id, userReason) {
    setGames(prev => prev.map(g => (g.id === id ? { ...g, userReason } : g)));
  }
  function resetFavorites() {
    setGames(prev => prev.map(g => ({ ...g, favorite: false })));
  }

  const filtered = useMemo(() => {
    const byQuery = games.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));
    const byPlatform = byQuery.filter(g => (platform === "All" ? true : g.platform === platform));
    const byFavs = onlyFavs ? byPlatform.filter(g => g.favorite) : byPlatform;
    return [...byFavs].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "platform") return a.platform.localeCompare(b.platform);
      return a.title.localeCompare(b.title);
    });
  }, [games, query, platform, sortBy, onlyFavs]);

  const stats = useMemo(() => {
    const total = games.length;
    const favs = games.filter(g => g.favorite).length;
    const avg = total === 0 ? 0 : games.reduce((s, g) => s + g.rating, 0) / total;
    return { total, favs, avg: Number(avg.toFixed(1)) };
  }, [games]);

  return (
    <div className="container">
      <Header onResetFavorites={resetFavorites} />
      <GameForm onAdd={addGame} platforms={PLATFORMS.slice(1)} />
      <FilterBar
        query={query} onQuery={setQuery}
        platform={platform} onPlatform={setPlatform}
        sortBy={sortBy} onSortBy={setSortBy}
        onlyFavs={onlyFavs} onOnlyFavs={setOnlyFavs}
        platforms={PLATFORMS}
      />
      <Stats total={stats.total} favs={stats.favs} avg={stats.avg} />

      <GameList
        games={filtered}
        onDelete={deleteGame}
        onToggleFavorite={toggleFavorite}
        onUpdateRating={updateRating}
        onUpdateUserReason={updateUserReason}
        openReasonId={openReasonId}
        setOpenReasonId={setOpenReasonId}
      />

      <footer className="siteFooter">by Adonis Younes</footer>
    </div>
  );
}
