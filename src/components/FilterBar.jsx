export default function FilterBar({
  query, onQuery,
  platform, onPlatform,
  sortBy, onSortBy,
  onlyFavs, onOnlyFavs,
  platforms,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Search title…"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />

      <select value={platform} onChange={(e) => onPlatform(e.target.value)}>
        {platforms.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
        <option value="title">Sort: Title (A→Z)</option>
        <option value="rating">Sort: Rating (High→Low)</option>
        <option value="platform">Sort: Platform</option>
      </select>

      <label className="favToggle">
        <input
          type="checkbox"
          checked={onlyFavs}
          onChange={(e) => onOnlyFavs(e.target.checked)}
        />
        Favorites only
      </label>
    </div>
  );
}
