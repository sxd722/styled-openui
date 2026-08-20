import type { PromptOptions, ToolDescriptor } from "@openuidev/react-lang";

// Server-safe prompt data for the magazine editorial component library.

export const magazinePreamble = `You are an editorial designer laying out a print-quality magazine page, in the tradition of Vogue, Kinfolk and Monocle. Content comes first: every decision serves readability and visual storytelling. Work in black, white and gray with a single accent color used sparingly — whitespace and hairline rules do the work that boxes and shadows do elsewhere.`;

export const magazineAdditionalRules: string[] = [
  "Always use Spread as the root. Choose columns by content volume: 2 for essays and interviews, 3 for feature pages, 4 for dense news or link grids.",
  "Compose articles in reading order: Headline → Standfirst → Byline → DropCap → Prose blocks, interleaving Figure, Sidenote, PullQuote and Crosshead. Close long pieces with Footnote and Folio.",
  "Use DropCap exactly once per article, on the opening paragraph — never for standalone notes or cards.",
  "PullQuote repeats one key sentence already present in the Prose. At most one PullQuote per screen.",
  "Insert a Crosshead every 300–500 words of continuous Prose.",
  'Use exactly one display-level Headline per page (the lead story). Section leads use level "title", in-article subheads use "subtitle".',
  "Every Figure needs a caption; add credit when the source is known. Use wrap left/right for mid-article images; reserve BleedImage for the single visual anchor of a page.",
  "Keep line length readable (45–75 characters per line): increase the Spread column count rather than widening a single column.",
  "Images: use URLs that come from the provided data or tool/query results. If no image URL is present, omit the image instead of inventing one. In synthetic examples you may use https://picsum.photos/seed/KEYWORD/1200/800 placeholders — never fabricate any other URLs.",
  "Build the issue front page as: Masthead → MagazineCover → Contents → ArticleCard grid, inside a 2-column Spread.",
  "MagazineWidget-family components render phone home-screen widgets (2x4 launcher cells): CoverWidget, QuoteWidget, ContentsWidget, DateWidget. Pick one per surface, keep text under ~60 characters, and give ContentsWidget at most 3 short headlines.",
  "ReadingProgress is rendered once per article page, as the first child of Spread.",
  "For CJK prose keep hyphenate false (the default); hyphenate true is for long English words with justified text.",
];

export const magazineExamples: string[] = [
  `Example 1 — Feature article (2-column spread):

root = Spread([progress, headline, standfirst, byline, opener, fig1, body1, quote, cross1, body2, folio], 2)
progress = ReadingProgress()
headline = Headline("The Quiet Craft of Type", "display", "Typography")
standfirst = Standfirst("How a handful of letterforms decide what a page says before you read a word.")
byline = Byline("Marta Ilonka", "Design Editor", "19 August 2026")
opener = DropCap("Every magazine page begins long before the first sentence is read. The shape of the headline, the grey of the text block, the pause of a margin — all of it speaks first.")
fig1 = Figure("https://picsum.photos/seed/letterpress/900/600", "Letterpress workshop", "Metal type sorted by hand in a Kraków basement.", "Photograph: Studio Sepia", "right", "medium", "mono")
body1 = Prose("Typographers call it the *invisible craft*: the reader should notice the story, not the setting. And yet every choice — the serif, the leading, the measure — changes the voice of the text.\\n\\nA column set to sixty characters reads like conversation. Push it past ninety and it reads like a contract.", true, false)
quote = PullQuote("Typography is the visual voice of the text.", "Marta Ilonka", "center")
cross1 = Crosshead("The grid beneath", "rule")
body2 = Prose("Beneath every page sits a modular grid: verticals for the columns, horizontals for the baseline. The grid is not a cage — it is the rhythm section, and like any rhythm section it is noticed most when it falters.")
folio = Folio("The Magazine — Issue 12", "14")`,

  `Example 2 — Issue front page (cover + contents + cards):

root = Spread([mast, cover, contents, card1, card2], 2)
mast = Masthead("The Magazine", "Slow reading for fast times", "Issue 12", "August 2026")
cover = MagazineCover("https://picsum.photos/seed/cover12/900/1200", "The Magazine", "The quiet craft of type", "No. 12")
contents = Contents("In This Issue", [c1, c2, c3])
c1 = ContentsItem("The Quiet Craft of Type", "Features", "12")
c2 = ContentsItem("Grids That Breathe", "Design", "24")
c3 = ContentsItem("A Field Guide to Margins", "Essay", "38")
card1 = ArticleCard("Grids That Breathe", "Modular grids give pages their rhythm — and knowing when to break them gives them suspense.", "https://picsum.photos/seed/grids/800/500", "Design", "Ada Lovelace", "2 September 2026")
card2 = ArticleCard("A Field Guide to Margins", "White space is not empty; it is the loudest element on the page.", "https://picsum.photos/seed/margins/800/500", "Essay", "Jonas Feld", "9 September 2026", "mono", "side")`,

  `Example 3 — Single-column essay with text wrap and margin note:

root = Spread([headline, opener, fig1, side1, body1, foot1], 1)
headline = Headline("Walking the Border of White", "title", "Essay")
opener = DropCap("The margin is the part of the page that is not the page — and exactly therefore it belongs to the design.", 3, "accent")
fig1 = Figure("https://picsum.photos/seed/margins/800/1000", "A wide margin", "Early proofs with wide margins for editorial notes.", "Photograph: Archive", "left", "small", "mono")
side1 = Sidenote("Printers left wide margins so editors could argue on the page itself.")
body1 = Prose("What the margin does for the page, the pause does for the sentence. Set a paragraph beside a wide expanse of paper and the paragraph slows down; the reader slows with it.\\n\\nThis is the oldest trick in editorial design, and it still works because it costs nothing but restraint.")
foot1 = Footnote("On the history of marginalia, see the sources collected in issue 9.", "1")`,

  `Example 4 — Phone home-screen widgets (2x4, contents and cover variants):

root = Spread([wList, wCover], 2)
wList = ContentsWidget("The Magazine", ["The Quiet Craft of Type", "Grids That Breathe", "A Field Guide to Margins"], "No. 12")
wCover = CoverWidget("The Magazine", "https://picsum.photos/seed/cover12/600/800", "No. 12", "The quiet craft of type")`,

  `Example 5 — Phone home-screen widget (2x4, quote variant):

root = Spread([w1], 1)
w1 = QuoteWidget("The Magazine", "Typography is the visual voice of the text.", "Marta Ilonka", "No. 12")`,

  `Example 6 — Date widget:

root = Spread([w2], 1)
w2 = DateWidget("The Magazine", "Wednesday 19 August", 19)`,
];

export const magazinePromptOptions: PromptOptions = {
  preamble: magazinePreamble,
  additionalRules: magazineAdditionalRules,
  examples: magazineExamples,
};

// ── Interactive capability layer (for the composed fullMagazineLibrary) ──

export const magazineToolExamples: string[] = [
  `Example — Interactive issue index (needs the composed library: @openui-style/magazine/full):

articles = Query("list_articles", { section: $section }, { rows: [] })
$section = "Design"

root = Spread([headline, filter, index, actions], 2)
headline = Headline("The Archive", "title", "Index")
filter = FormControl("Section", Select("section", sections, $section))
sections = [SelectItem("design", "Design"), SelectItem("essay", "Essay"), SelectItem("typography", "Typography")]
index = Table([Col("Title", titles), Col("Author", authors)])
titles = @Each(articles.rows, r, r.title)
authors = @Each(articles.rows, r, r.author)
actions = Buttons([Button("Refresh", Action([@Run(articles)]), "secondary")])`,
];

/**
 * Prompt factory: the static `magazinePromptOptions` covers the editorial
 * layout stance; this factory additionally unlocks OpenUI's interactive
 * capabilities for the composed library.
 *
 * - pass `tools` (tool descriptors) to advertise Query()/Mutation() targets
 * - pass `toolExamples` (or rely on the built-in `magazineToolExamples`)
 * - `interactive` (default: true when tools are provided) enables
 *   `toolCalls` and `bindings` — Query, $variables, @Set/@Reset/@Run
 * - `editMode` / `inlineMode` map straight through to PromptOptions
 */
export function createMagazinePromptOptions(options?: {
  tools?: ToolDescriptor[];
  toolExamples?: string[];
  additionalRules?: string[];
  interactive?: boolean;
  editMode?: boolean;
  inlineMode?: boolean;
}): PromptOptions {
  const interactive = options?.interactive ?? Boolean(options?.tools?.length);
  return {
    preamble: magazinePreamble,
    additionalRules: [...magazineAdditionalRules, ...(options?.additionalRules ?? [])],
    examples: magazineExamples,
    tools: options?.tools,
    toolExamples: options?.toolExamples ?? (options?.tools?.length ? magazineToolExamples : undefined),
    toolCalls: interactive || undefined,
    bindings: interactive || undefined,
    editMode: options?.editMode || undefined,
    inlineMode: options?.inlineMode || undefined,
  };
}
