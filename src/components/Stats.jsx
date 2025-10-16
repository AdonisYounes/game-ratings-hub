export default function Stats({ total, favs, avg }) {
  return (
    <div className="stats">
      <span><strong>{total}</strong> games</span>
      <span>• <strong>{favs}</strong> favorites</span>
      <span>• avg <strong>{avg}</strong>/10</span>
    </div>
  );
}
