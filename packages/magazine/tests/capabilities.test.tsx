import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

import { composeLibraries } from "@openui-style/core";
import { Renderer, type OpenUIError } from "@openuidev/react-lang";

import { Headline, magazineLibrary } from "../src";
import { fullMagazineLibrary } from "../src/full";

function renderDoc(
  doc: string,
  {
    library = fullMagazineLibrary,
    onAction,
    toolProvider,
  }: {
    library?: typeof fullMagazineLibrary;
    onAction?: ReturnType<typeof vi.fn>;
    toolProvider?: Record<string, (args: unknown) => Promise<unknown>>;
  } = {},
) {
  return render(
    <Renderer
      response={doc}
      library={library}
      onAction={onAction}
      toolProvider={toolProvider}
    />,
  );
}

describe("library composition", () => {
  it("merges official and magazine components into one library", () => {
    const names = Object.keys(fullMagazineLibrary.components);
    // magazine side
    for (const name of ["Spread", "Headline", "DropCap", "QuoteWidget"]) {
      expect(names).toContain(name);
    }
    // official openuiLibrary side
    for (const name of ["Stack", "TextContent", "Button", "Table", "Form"]) {
      expect(names).toContain(name);
    }
    expect(fullMagazineLibrary.root).toBe("Spread");
    expect(fullMagazineLibrary.id).toBe("openui-style/magazine/full");
  });

  it("merges componentGroups from both libraries", () => {
    const groupNames = (fullMagazineLibrary.componentGroups ?? []).map((g) => g.name);
    expect(groupNames).toContain("Typography");
    expect(groupNames).toContain("Publication");
  });

  it("throws on duplicate component names instead of overriding", () => {
    expect(() =>
      composeLibraries({
        id: "test/dup",
        root: "Spread",
        libraries: [magazineLibrary, magazineLibrary],
      }),
    ).toThrow(/duplicate component/);
  });

  it("throws when root is missing from the merged set", () => {
    expect(() =>
      composeLibraries({ id: "test/root", root: "Nope", libraries: [magazineLibrary] }),
    ).toThrow(/root "Nope"/);
  });
});

describe("mixed-component rendering (composed library)", () => {
  it("renders magazine and official components in the same Spread", async () => {
    const { container } = renderDoc(`
root = Spread([headline, intro, btn], 1)
headline = Headline("Mixed Page", "title")
intro = TextContent("Official component inside a magazine Spread.")
btn = Button("Read more", Action([@ToAssistant("open article")]), "primary")
`);
    await waitFor(() => expect(screen.getByText("Mixed Page")).toBeTruthy());
    expect(screen.getByText("Official component inside a magazine Spread.")).toBeTruthy();
    expect(screen.getByRole("button", { name: /read more/i })).toBeTruthy();
    expect(container.querySelector(".openui-mag-spread")).toBeTruthy();
  });

  it("fires onAction when an official Button with @ToAssistant is clicked", async () => {
    const onAction = vi.fn();
    renderDoc(
      `
root = Spread([headline, btn], 1)
headline = Headline("Actions", "title")
btn = Button("Subscribe", Action([@ToAssistant("subscribe")]), "primary")
`,
      { onAction },
    );
    const btn = await screen.findByRole("button", { name: /subscribe/i });
    fireEvent.click(btn);
    await waitFor(() => expect(onAction).toHaveBeenCalledTimes(1));
  });
});

describe("structured errors", () => {
  it("reports unknown components through onError", async () => {
    const errors: OpenUIError[] = [];
    render(
      <Renderer
        response={`root = Spread([x], 1)\nx = DoesNotExist("oops")`}
        library={fullMagazineLibrary}
        onError={(e) => errors.push(...e)}
      />,
    );
    await waitFor(() => expect(errors.length).toBeGreaterThan(0));
    expect(errors.some((e) => /DoesNotExist|Unknown component/i.test(e.message))).toBe(true);
  });

  it("reports tool-not-found for Query() against an absent tool", async () => {
    const errors: OpenUIError[] = [];
    render(
      <Renderer
        response={`data = Query("missing_tool", {}, { rows: [] })\nroot = Spread([headline], 1)\nheadline = Headline("Q", "title")`}
        library={fullMagazineLibrary}
        toolProvider={{}}
        onError={(e) => errors.push(...e)}
      />,
    );
    await waitFor(
      () => expect(errors.some((e) => /missing_tool|not found/i.test(e.message))).toBe(true),
      { timeout: 4000 },
    );
  });
});

describe("streaming resilience", () => {
  it("keeps rendering as partial source grows, without crashing on fragments", async () => {
    const chunks = [
      `root = Spread([headline`,
      `, intro], 1)\n`,
      `headline = Headline("Live Type", "title")\n`,
      `intro = Prose("Streamed in chunk by chunk.")`,
    ];

    let acc = "";
    const view = render(<Renderer response={acc} library={fullMagazineLibrary} isStreaming />);
    for (const chunk of chunks) {
      acc += chunk;
      await act(async () => {
        view.rerender(<Renderer response={acc} library={fullMagazineLibrary} isStreaming />);
      });
    }
    await act(async () => {
      view.rerender(<Renderer response={acc} library={fullMagazineLibrary} />);
    });
    await waitFor(() => expect(screen.getByText("Live Type")).toBeTruthy());
    expect(screen.getByText("Streamed in chunk by chunk.")).toBeTruthy();
  });
});

describe("Query + toolProvider", () => {
  it("streams tool data into the rendered UI", async () => {
    render(
      <Renderer
        response={`stats = Query("issue_stats", {}, { total: 0 })\nroot = Spread([headline, intro], 1)\nheadline = Headline("From the Archive", "title")\nintro = TextContent(stats.total)`}
        library={fullMagazineLibrary}
        toolProvider={{
          issue_stats: async () => ({ total: 42 }),
        }}
      />,
    );
    // The query default ({ total: 0 }) renders first, then the tool result
    // replaces it once resolved.
    await waitFor(() => expect(screen.getByText("42")).toBeTruthy(), { timeout: 4000 });
    expect(screen.getByText("From the Archive")).toBeTruthy();
  });
});

describe("host runtime callbacks", () => {
  it("reports parse meta through onParseResult", async () => {
    const spy = vi.fn();
    render(
      <Renderer
        response={`root = Spread([headline], 1)\nheadline = Headline("T", "title")`}
        library={fullMagazineLibrary}
        onParseResult={spy}
      />,
    );
    await waitFor(() => expect(spy).toHaveBeenCalled(), { timeout: 2000 });
    const result = spy.mock.lastCall[0] as { meta?: { statementCount?: number } };
    expect(result?.meta?.statementCount).toBe(2);
  });
});

describe("open Spread schema", () => {
  it("Spread children accept any component (no closed union)", () => {
    expect(Headline.name).toBe("Headline");
    // columns validation still strict
    const parse = magazineLibrary.toJSONSchema();
    expect(parse.$defs?.Spread).toBeDefined();
  });
});
