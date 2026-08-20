import { Renderer, type OpenUIError } from "@openuidev/react-lang";
import { useDeferredValue, useMemo, useState } from "react";

import type { StyleRegistration } from "../registry";

/**
 * Paste OpenUI Lang source on the left; the style's library renders it live
 * on the right. Parse/validation errors surface in a structured panel.
 */
export function Playground({ registration }: { registration: StyleRegistration }) {
  const [source, setSource] = useState(registration.playgroundSample);
  const [errors, setErrors] = useState<OpenUIError[]>([]);
  const deferredSource = useDeferredValue(source);

  const rendered = useMemo(
    () => (
      <Renderer
        response={deferredSource}
        library={registration.library}
        onError={setErrors}
      />
    ),
    [deferredSource, registration],
  );

  return (
    <div className="demo-playground">
      <div className="demo-playground__editor-pane">
        <div className="demo-playground__toolbar">
          <span className="demo-playground__title">OpenUI Lang source</span>
          <button
            className="demo-playground__sample-btn"
            onClick={() => setSource(registration.playgroundSample)}
          >
            Reset sample
          </button>
        </div>
        <textarea
          className="demo-playground__textarea"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
          aria-label="OpenUI Lang source"
        />
        {errors.length > 0 ? (
          <ul className="demo-playground__errors">
            {errors.map((e, i) => (
              <li key={i} className="demo-playground__error">
                <span className="demo-playground__error-message">{e.message}</span>
                {(e.statementId || e.component || e.path) && (
                  <span className="demo-playground__error-where">
                    {[e.statementId && `statement: ${e.statementId}`, e.component, e.path]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="demo-playground__ok">
            ✓ parses clean — rendering with {registration.id}Library
          </p>
        )}
      </div>
      <div className="demo-playground__render-pane">{rendered}</div>
    </div>
  );
}
