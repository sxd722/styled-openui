import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { magazineLibrary, magazinePromptOptions } from "@openui-style/magazine";

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

describe("demo Playground", () => {
  it("renders editor and render panes for a style", () => {
    const { container } = render(<Playground registration={registration} />);
    expect(container.querySelector(".demo-playground")).toBeTruthy();
    expect(container.querySelector(".demo-playground__textarea")).toBeTruthy();
  });
});
