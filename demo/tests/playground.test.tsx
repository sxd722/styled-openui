import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { magazineLibrary, magazinePromptOptions } from "@openui-style/magazine";
import { fullMagazineLibrary } from "@openui-style/magazine/full";

import { Playground } from "../pages/Playground";
import type { StyleRegistration } from "../registry";

const registration: StyleRegistration = {
  id: "magazine",
  label: "Magazine",
  library: magazineLibrary,
  promptOptions: magazinePromptOptions,
  pages: [],
  playgroundSample: `root = Spread([body], 1)
body = Prose("Hello")`,
};

const fullRegistration: StyleRegistration = {
  id: "magazine-full",
  label: "Magazine + OpenUI",
  library: fullMagazineLibrary,
  promptOptions: magazinePromptOptions,
  pages: [],
  playgroundSample: `stats = Query("issue_stats", {}, { label: "" })
root = Spread([headline, statline], 1)
headline = Headline("Probe", "title")
statline = TextContent(stats.label)`,
  toolProvider: {
    issue_stats: async () => ({ label: "42 stories" }),
  },
};

describe("demo Playground", () => {
  it("renders editor and render panes for a style", () => {
    const { container } = render(<Playground registration={registration} />);
    expect(container.querySelector(".demo-playground")).toBeTruthy();
    expect(container.querySelector(".demo-playground__textarea")).toBeTruthy();
  });

  it("populates the runtime inspector (parse meta + query data)", async () => {
    const { container } = render(<Playground registration={fullRegistration} />);
    await waitFor(
      () => {
        const values = container.querySelectorAll(".demo-runtime__value");
        expect(values.length).toBe(3);
        expect(values[2].textContent).toMatch(/statements: 4/);
      },
      { timeout: 3000 },
    );
    await waitFor(() => expect(container.textContent).toContain("42 stories"));
  });
});
