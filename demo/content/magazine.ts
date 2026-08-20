// Hand-written OpenUI Lang documents for the magazine style, rendered
// through magazineLibrary. No LLM required.

export const magazineArticleDoc = `
root = Spread([progress, headline, standfirst, byline, opener, fig1, body1, quote, cross1, side1, body2, fig2, body3, foot1, folio], 2)
progress = ReadingProgress()
headline = Headline("The Quiet Craft of Type", "display", "Typography")
standfirst = Standfirst("How a handful of letterforms decide what a page says before you read a word.")
byline = Byline("Marta Ilonka", "Design Editor", "19 August 2026")
opener = DropCap("Every magazine page begins long before the first sentence is read. The shape of the headline, the grey of the text block, the pause of a margin — all of it speaks first, and the reader answers before a single word lands.")
fig1 = Figure("https://picsum.photos/seed/letterpress/900/600", "Letterpress workshop", "Metal type sorted by hand in a Kraków basement.", "Photograph: Studio Sepia", "right", "medium", "mono")
body1 = Prose("Typographers call it the *invisible craft*: the reader should notice the story, not the setting. And yet every choice — the serif, the leading, the measure — changes the voice of the text.\\n\\nA column set to sixty characters reads like conversation. Push it past ninety and it reads like a contract. The difference is not pedantry; it is the difference between being listened to and being processed.", true, false)
quote = PullQuote("Typography is the visual voice of the text.", "Marta Ilonka", "center")
cross1 = Crosshead("The grid beneath", "rule")
side1 = Sidenote("Müller-Brockmann: the grid is an expression of a professional ethos — the designer as keeper of order.")
body2 = Prose("Beneath every page sits a modular grid: verticals for the columns, horizontals for the baseline. The grid is not a cage — it is the rhythm section, and like any rhythm section it is noticed most when it falters.\\n\\nBaseline grids make vertical rhythm audible to the eye. When two columns share a baseline, the page stops being two strips of text and becomes one instrument.")
fig2 = BleedImage("https://picsum.photos/seed/printshop/1600/900", "Print shop at dusk", "Issue 12 was set in the last hot-metal workshop in the city.", "medium", "mono")
body3 = Prose("None of this is nostalgia. The constraints of print — fixed pages, real ink, no scroll — forced decisions that screens let us defer. A magazine spread has to choose: what leads, what recedes, what is cut. **That choosing is the craft.**")
foot1 = Footnote("On the survival of hot-metal workshops, see the report in issue 9.", "1")
folio = Folio("The Magazine — Issue 12", "14")
`;

export const magazineFrontDoc = `
root = Spread([mast, cover, contents, card1, card2, card3], 2)
mast = Masthead("The Magazine", "Slow reading for fast times", "Issue 12", "August 2026")
cover = MagazineCover("https://picsum.photos/seed/cover12/900/1200", "The Magazine", "The quiet craft of type", "No. 12")
contents = Contents("In This Issue", [c1, c2, c3, c4])
c1 = ContentsItem("The Quiet Craft of Type", "Features", "12")
c2 = ContentsItem("Grids That Breathe", "Design", "24")
c3 = ContentsItem("A Field Guide to Margins", "Essay", "38")
c4 = ContentsItem("Ornaments, Considered", "Typography", "46")
card1 = ArticleCard("Grids That Breathe", "Modular grids give pages their rhythm — and knowing when to break them gives them suspense.", "https://picsum.photos/seed/grids/800/500", "Design", "Ada Lovelace", "2 September 2026")
card2 = ArticleCard("A Field Guide to Margins", "White space is not empty; it is the loudest element on the page.", "https://picsum.photos/seed/margins/800/500", "Essay", "Jonas Feld", "9 September 2026", "mono", "side")
card3 = ArticleCard("Ornaments, Considered", "A fleuron is a full stop you can dance to. A short history of the printed flourish.", "https://picsum.photos/seed/fleuron/800/500", "Typography", "Iris Kwon", "16 September 2026", "color", "side")
`;

export const magazineWidgetsDoc = `
root = Spread([wQuote, wCover, wList, wDate], 4)
wQuote = QuoteWidget("The Magazine", "Typography is the visual voice of the text.", "Marta Ilonka", "No. 12")
wCover = CoverWidget("The Magazine", "https://picsum.photos/seed/cover12/600/800", "No. 12", "The quiet craft of type")
wList = ContentsWidget("The Magazine", ["The Quiet Craft of Type", "Grids That Breathe", "A Field Guide to Margins"], "No. 12")
wDate = DateWidget("The Magazine", "Wednesday 19 August", 19)
`;

export const magazinePlaygroundSample = `root = Spread([headline, byline, opener, body], 2)
headline = Headline("A Short Piece", "title", "Essay")
byline = Byline("Ada Lovelace", "Editor", "19 August 2026")
opener = DropCap("Paste any OpenUI Lang source here and it renders live with the magazine library.")
body = Prose("Edit the text on the left — the page on the right re-renders as you type.")`;
