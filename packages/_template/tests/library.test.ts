import { describe, expect, it } from "vitest";

import { templateLibrary, templatePromptOptions } from "../src";

describe("TEMPLATE library", () => {
  it("uses the template root and id", () => {
    expect(templateLibrary.root).toBe("Section");
    expect(templateLibrary.id).toBe("openui-style/TEMPLATE");
  });

  it("generates a prompt from the options", () => {
    const prompt = templateLibrary.prompt(templatePromptOptions);
    expect(prompt).toContain("Section(");
  });
});
