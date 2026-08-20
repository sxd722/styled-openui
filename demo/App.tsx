import { useState } from "react";

import { DEFAULT_STYLE_ID, STYLES } from "./registry";
import { Playground } from "./pages/Playground";
import { StylePageView } from "./pages/StylePages";

/** Hash format: #/<style>/<page> — e.g. #/magazine/playground */
function parseHash(): { styleId: string; pageId: string } {
  const [styleId = "", pageId = ""] = window.location.hash.replace(/^#\/?/, "").split("/");
  return { styleId, pageId };
}

export function App() {
  const initial = parseHash();
  const [styleId, setStyleId] = useState(() =>
    STYLES.some((s) => s.id === initial.styleId) ? initial.styleId : DEFAULT_STYLE_ID,
  );
  const style = STYLES.find((s) => s.id === styleId)!;

  const playgroundPage = { id: "playground", label: "Paste & render" };
  const pages = [...style.pages, playgroundPage];
  const [pageId, setPageId] = useState(() =>
    pages.some((p) => p.id === initial.pageId) ? initial.pageId : style.pages[0].id,
  );
  const page = pages.find((p) => p.id === pageId) ?? style.pages[0];

  const select = (nextStyleId: string, nextPageId: string) => {
    setStyleId(nextStyleId);
    setPageId(nextPageId);
    window.location.hash = `/${nextStyleId}/${nextPageId}`;
  };

  const switchStyle = (nextStyleId: string) => {
    const next = STYLES.find((s) => s.id === nextStyleId)!;
    select(nextStyleId, next.pages[0].id);
  };

  return (
    <div className="demo-shell">
      <nav className="demo-nav">
        <div className="demo-nav__styles">
          {STYLES.map((s) => (
            <button
              key={s.id}
              className={
                s.id === styleId ? "demo-nav__btn demo-nav__btn--active" : "demo-nav__btn"
              }
              onClick={() => switchStyle(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="demo-nav__pages">
          {pages.map((p) => (
            <button
              key={p.id}
              className={p.id === pageId ? "demo-nav__btn demo-nav__btn--active" : "demo-nav__btn"}
              onClick={() => select(styleId, p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="demo-main">
        {pageId === "playground" ? (
          <Playground registration={style} />
        ) : (
          <StylePageView registration={style} page={page} />
        )}
      </main>
    </div>
  );
}
