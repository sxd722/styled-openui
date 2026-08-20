import {
  Renderer,
  type ActionEvent,
  type OpenUIError,
  type ParseResult,
} from "@openuidev/react-lang";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import type { StyleRegistration } from "../registry";

interface RuntimeState {
  actions: string[];
  formState: Record<string, unknown> | null;
  parse: ParseResult | null;
}

/**
 * Paste OpenUI Lang source on the left; the style's library renders it live
 * on the right. Wires the FULL Renderer runtime: streaming simulation,
 * toolProvider (Query/Mutation), action log, state inspector and parse
 * result inspector — so the demo exercises OpenUI, not just static markup.
 */
export function Playground({ registration }: { registration: StyleRegistration }) {
  const [source, setSource] = useState(registration.playgroundSample);
  const [errors, setErrors] = useState<OpenUIError[]>([]);
  const [runtime, setRuntime] = useState<RuntimeState>({
    actions: [],
    formState: null,
    parse: null,
  });
  const [isStreaming, setIsStreaming] = useState(false);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset when switching styles — but not on first mount, or this effect
  // would clobber the parse result the Renderer reports during mount.
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setSource(registration.playgroundSample);
    setErrors([]);
    setRuntime({ actions: [], formState: null, parse: null });
  }, [registration]);

  // Simulate an LLM stream: feed the source in chunks with isStreaming=true,
  // exactly like an SSE consumer would.
  const startStream = useCallback(() => {
    if (streamTimer.current) clearInterval(streamTimer.current);
    const full = source;
    const chunks = 12;
    const step = Math.ceil(full.length / chunks);
    let pos = 0;
    setSource("");
    setIsStreaming(true);
    streamTimer.current = setInterval(() => {
      pos += step;
      if (pos >= full.length) {
        setSource(full);
        setIsStreaming(false);
        if (streamTimer.current) clearInterval(streamTimer.current);
        streamTimer.current = null;
        return;
      }
      setSource(full.slice(0, pos));
    }, 260);
  }, [source]);

  useEffect(() => () => {
    if (streamTimer.current) clearInterval(streamTimer.current);
  }, []);

  const deferredSource = useDeferredValue(source);

  const handleAction = useCallback((event: ActionEvent) => {
    setRuntime((prev) => ({
      ...prev,
      actions: [describeAction(event), ...prev.actions].slice(0, 6),
    }));
  }, []);

  const handleStateUpdate = useCallback((state: Record<string, unknown>) => {
    setRuntime((prev) => ({ ...prev, formState: { ...state } }));
  }, []);

  const handleParseResult = useCallback((result: ParseResult | null) => {
    setRuntime((prev) => ({ ...prev, parse: result }));
  }, []);

  const rendered = useMemo(
    () => (
      <Renderer
        response={deferredSource}
        library={registration.library}
        isStreaming={isStreaming}
        toolProvider={registration.toolProvider ?? null}
        onAction={handleAction}
        onStateUpdate={handleStateUpdate}
        onParseResult={handleParseResult}
        onError={setErrors}
      />
    ),
    [deferredSource, isStreaming, registration, handleAction, handleStateUpdate, handleParseResult],
  );

  return (
    <div className="demo-playground">
      <div className="demo-playground__editor-pane">
        <div className="demo-playground__toolbar">
          <span className="demo-playground__title">
            OpenUI Lang source{isStreaming ? " — streaming…" : ""}
          </span>
          <div className="demo-playground__samples">
            <button className="demo-playground__sample-btn" onClick={startStream} disabled={isStreaming}>
              ▶ Stream
            </button>
            <button
              className="demo-playground__sample-btn"
              onClick={() => setSource(registration.playgroundSample)}
              disabled={isStreaming}
            >
              Reset sample
            </button>
          </div>
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
          <p className="demo-playground__ok">✓ parses clean — rendering with {registration.id}</p>
        )}

        <RuntimeInspector runtime={runtime} />
      </div>
      <div className="demo-playground__render-pane">{rendered}</div>
    </div>
  );
}

function describeAction(event: ActionEvent): string {
  const detail = `${event.type}: ${event.humanFriendlyMessage || JSON.stringify(event.params)}`;
  return detail.length > 140 ? `${detail.slice(0, 140)}…` : detail;
}

function RuntimeInspector({ runtime }: { runtime: RuntimeState }) {
  const meta = runtime.parse?.meta;
  return (
    <div className="demo-runtime">
      <div className="demo-runtime__row">
        <span className="demo-runtime__label">actions</span>
        <span className="demo-runtime__value">
          {runtime.actions.length === 0
            ? "—"
            : runtime.actions.map((a, i) => (
                <code key={i} className="demo-runtime__chip">
                  {a}
                </code>
              ))}
        </span>
      </div>
      <div className="demo-runtime__row">
        <span className="demo-runtime__label">state</span>
        <code className="demo-runtime__value">
          {runtime.formState ? JSON.stringify(runtime.formState) : "—"}
        </code>
      </div>
      <div className="demo-runtime__row">
        <span className="demo-runtime__label">parse</span>
        <code className="demo-runtime__value">
          {meta
            ? `statements: ${meta.statementCount} · unresolved: ${Array.isArray(meta.unresolved) ? meta.unresolved.length : 0} · incomplete: ${meta.incomplete ? "yes" : "no"}`
            : "—"}
        </code>
      </div>
    </div>
  );
}
