import GameItem from "./GameItem.jsx";

export default function GameList({
  games,
  onDelete,
  onToggleFavorite,
  onUpdateRating,
  onUpdateUserReason,
  openReasonId,
  setOpenReasonId
}) {
  if (games.length === 0) return <p className="muted">No games to show.</p>;
  return (
    <ul className="list">
      {games.map(g => (
        <GameItem
          key={g.id}
          game={g}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onUpdateRating={onUpdateRating}
          onUpdateUserReason={onUpdateUserReason}
          openReasonId={openReasonId}
          setOpenReasonId={setOpenReasonId}
        />
      ))}
    </ul>
  );
}
