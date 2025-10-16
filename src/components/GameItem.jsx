import { useState, useEffect } from "react";

function pickTheme(title, platform) {
  const t = title.toLowerCase();
  if (t.includes("red dead"))          return ["#2a0505", "#d81b1b"];
  if (t.includes("minecraft"))         return ["#0f2a12", "#2ecc71"];
  if (t.includes("blasphemous"))       return ["#3a0b1a", "#c2185b"];
  if (t.includes("lies of p"))         return ["#0b1b2a", "#2a9df4"];
  if (t.includes("fifa") || t.includes("fc ")) return ["#0b2a1a", "#26a269"];
  if (t.includes("dragon ball"))       return ["#2a1408", "#ff9800"];
  if (t.includes("doom eternal"))      return ["#2a0b0b", "#ff7043"];
  if (t.includes("balatro"))           return ["#2a0b3a", "#b5179e"];
  if (t.includes("ghost of tsushima")) return ["#0a0a0a", "#ef5350"];
  if (t.includes("god of war"))        return ["#2a0f13", "#d32f2f"];
  if (t.includes("sifu"))              return ["#1a0a0a", "#e53935"];
  if (t.includes("mario kart 8"))      return ["#0b1b2a", "#42a5f5"];
  if (t.includes("super mario 64"))    return ["#0b1b2a", "#ffd54f"];
  if (t.includes("terraria"))          return ["#0b1a0b", "#66bb6a"];
  const p = (platform || "").toLowerCase();
  if (p.includes("playstation")) return ["#0d1b2a", "#1b98e0"];
  if (p.includes("xbox"))        return ["#0d2a1b", "#2ecc71"];
  if (p.includes("switch"))      return ["#200a0a", "#ff5252"];
  return ["#141820", "#2a2f3a"];
}

export default function GameItem({
  game,
  onDelete,
  onToggleFavorite,
  onUpdateRating,
  onUpdateUserReason,
  openReasonId,
  setOpenReasonId
}) {
  const [c1, c2] = pickTheme(game.title, game.platform);
  const style = { "--c1": c1, "--c2": c2 };

  const isOpen = openReasonId === game.id;
  const [draftReason, setDraftReason] = useState(game.userReason ?? "");

  // keep local draft in sync when switching panels
  useEffect(() => {
    if (isOpen) setDraftReason(game.userReason ?? "");
  }, [isOpen, game.userReason]);

  function handleSliderChange(v) {
    onUpdateRating(game.id, Number(v));
  }
  function handleSliderRelease() {
    setOpenReasonId(game.id); // open this one; others auto-close
  }
  function toggleReason() {
    setOpenReasonId(isOpen ? null : game.id);
  }
  function saveReason() {
    onUpdateUserReason(game.id, draftReason.trim());
  }

  return (
    <li className="card themed chunky" style={style}>
      <div className="grow">
        <div className="titleRow">
          <span className="title">{game.title}</span>
          <span className="platform">{game.platform}</span>
        </div>

        <div className="metaRow sleekRow">
          <div className="badgeRating">{game.rating}/10</div>

          <input
            className="sleekSlider"
            type="range"
            min="1"
            max="10"
            value={game.rating}
            onChange={(e) => handleSliderChange(e.target.value)}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
          />

          <button className="btn ghost" onClick={toggleReason}>
            {isOpen ? "Close reason" : "Edit reason"}
          </button>
        </div>

        {/* Inline, expanding panel that stays inside the card */}
        <div className={`reasonPanel ${isOpen ? "open" : ""}`}>
          <div className="reasonInner">
            <div className="reasonBlock">
              <h4>Adonis's Reason:</h4>
              <p>{game.adonisReason || "—"}</p>
            </div>
            <div className="reasonBlock">
              <h4>Your Reason:</h4>
              <textarea
                rows={3}
                value={draftReason}
                onChange={(e) => setDraftReason(e.target.value)}
                placeholder="Why this rating? (A couple sentences...)"
              />
              <div className="reasonActions">
                <button className="btn" onClick={saveReason}>Save</button>
                <button className="btn ghost" onClick={() => setOpenReasonId(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button
          className={"iconBtn " + (game.favorite ? "active" : "")}
          onClick={() => onToggleFavorite(game.id)}
          title="Toggle favorite"
          aria-label="Toggle favorite"
        >
          ★
        </button>
        <button className="btn danger" onClick={() => onDelete(game.id)}>Delete</button>
      </div>
    </li>
  );
}
