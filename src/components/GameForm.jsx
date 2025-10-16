import { useState } from "react";

export default function GameForm({ onAdd, platforms }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState(platforms[0] || "PC");
  const [rating, setRating] = useState(7);

  function handleSubmit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    const r = Math.max(1, Math.min(10, Number(rating)));
    onAdd({ title: t, platform, rating: r });
    setTitle("");
    setRating(7);
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        placeholder="Add a game title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="ratingInput"
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
