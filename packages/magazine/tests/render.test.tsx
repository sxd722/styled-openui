import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Renderer } from "@openuidev/react-lang";
import { magazineLibrary } from "../src";

function renderDoc(doc: string) {
  const { container } = render(<Renderer response={doc} library={magazineLibrary} />);
  return container;
}

describe("Renderer + magazineLibrary", () => {
  it("renders a full article spread", async () => {
    const container = renderDoc(`
root = Spread([headline, standfirst, byline, opener, body], 2)
headline = Headline("The Quiet Craft of Type", "display", "Typography")
standfirst = Standfirst("How letterforms decide what a page says.")
byline = Byline("Marta Ilonka", "Design Editor", "19 August 2026")
opener = DropCap("Every magazine page begins long before the first sentence is read.")
body = Prose("Body copy follows the opening paragraph.\\n\\nA second paragraph keeps the rhythm.")
`);
    await waitFor(() =>
      expect(screen.getByText("The Quiet Craft of Type")).toBeTruthy(),
    );
    const spread = container.querySelector(".openui-mag-spread");
    expect(spread).toBeTruthy();
    expect(spread?.className).toContain("openui-mag-spread-2col");
    expect(container.querySelector(".openui-mag-dropcap")).toBeTruthy();
    expect(container.querySelectorAll(".openui-mag-prose p")).toHaveLength(2);
    expect(screen.getByText("By Marta Ilonka")).toBeTruthy();
  });

  it("renders Contents with ContentsItem sub-components", async () => {
    const container = renderDoc(`
root = Spread([contents], 1)
contents = Contents("In This Issue", [c1, c2])
c1 = ContentsItem("The Quiet Craft of Type", "Features", "12")
c2 = ContentsItem("Grids That Breathe", "Design", "24")
`);
    await waitFor(() => expect(screen.getByText("In This Issue")).toBeTruthy());
    const items = container.querySelectorAll(".openui-mag-contents__item");
    expect(items).toHaveLength(2);
    expect(screen.getByText("Grids That Breathe")).toBeTruthy();
    expect(screen.getByText("24")).toBeTruthy();
  });

  it("renders the 2x4 widget variants", async () => {
    const container = renderDoc(`
root = Spread([w1, w2], 2)
w1 = QuoteWidget("The Magazine", "Typography is the visual voice of the text.", "Marta Ilonka", "No. 12")
w2 = ContentsWidget("The Magazine", ["Story one", "Story two", "Story three"], "No. 12")
`);
    await waitFor(() => expect(screen.getAllByText("The Magazine").length).toBeGreaterThanOrEqual(2));
    const widgets = container.querySelectorAll(".openui-mag-widget");
    expect(widgets).toHaveLength(2);
    expect(container.querySelector(".openui-mag-widget-quote")).toBeTruthy();
    expect(container.querySelector(".openui-mag-widget-contents")).toBeTruthy();
    expect(container.querySelectorAll(".openui-mag-widget__contents-item")).toHaveLength(3);
  });

  it("renders figures with wrap and mono tone", async () => {
    const container = renderDoc(`
root = Spread([fig, body], 1)
fig = Figure("https://picsum.photos/seed/test/800/600", "Alt text", "A caption.", "Photograph: X", "left", "small", "mono")
body = Prose("Text wrapping around the figure.")
`);
    await waitFor(() => expect(screen.getByText("A caption.")).toBeTruthy());
    const fig = container.querySelector(".openui-mag-figure");
    expect(fig?.className).toContain("openui-mag-figure-wrap-left");
    expect(fig?.className).toContain("openui-mag-figure-mono");
    expect(fig?.querySelector("img")?.getAttribute("loading")).toBe("lazy");
  });
});
