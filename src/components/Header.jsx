export default function Header({ onResetFavorites }) {
  return (
    <header className="header header-center">
      <h1 className="ut-title">MY GAME RATINGS HUB</h1>
      <button className="btn" onClick={onResetFavorites}>Reset Favorites</button>
    </header>
  );
}
