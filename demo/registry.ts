import type { Library, PromptOptions } from "@openuidev/react-lang";
import {
  createMagazinePromptOptions,
  magazineLibrary,
  magazinePromptOptions,
} from "@openui-style/magazine";
import { fullMagazineLibrary } from "@openui-style/magazine/full";

// Style side-effect imports: tokens + component styles land in the bundle.
import "@openui-style/magazine/defaults.css";
import "@openui-style/magazine/styles/index.scss";
import "@openui-style/magazine/styles/fonts.css";
// Official component styles for the composed magazine-full library.
import "@openuidev/react-ui/defaults.css";
import "@openuidev/react-ui/index.css";

import {
  magazineArticleDoc,
  magazineFrontDoc,
  magazineFullInteractiveDoc,
  magazineFullPlaygroundSample,
  magazinePlaygroundSample,
  magazineWidgetsDoc,
} from "./content/magazine";
import { demoToolDescriptors, demoToolProvider } from "./tools";

export interface StylePage {
  id: string;
  label: string;
  /** OpenUI Lang document; omitted for built-in pages like the playground. */
  doc?: string;
  /** "phone" renders the page inside the launcher mock frame. */
  layout?: "page" | "phone";
}

export interface StyleRegistration {
  id: string;
  label: string;
  library: Library;
  promptOptions: PromptOptions;
  pages: StylePage[];
  playgroundSample: string;
  /** Optional fake tool backend — enables Query()/Mutation() demos. */
  toolProvider?: Record<string, (args: unknown) => Promise<unknown>>;
}

/**
 * The style registry — the single place a new style joins the demo.
 * Add a package, a content module, and one entry here.
 */
export const STYLES: StyleRegistration[] = [
  {
    id: "magazine",
    label: "Magazine",
    library: magazineLibrary,
    promptOptions: magazinePromptOptions,
    pages: [
      { id: "article", label: "Feature article", doc: magazineArticleDoc },
      { id: "front", label: "Issue front page", doc: magazineFrontDoc },
      { id: "widgets", label: "2×4 widgets", doc: magazineWidgetsDoc, layout: "phone" },
    ],
    playgroundSample: magazinePlaygroundSample,
  },
  {
    id: "magazine-full",
    label: "Magazine + OpenUI",
    library: fullMagazineLibrary,
    promptOptions: createMagazinePromptOptions({ tools: demoToolDescriptors }),
    pages: [
      {
        id: "interactive",
        label: "Interactive archive",
        doc: magazineFullInteractiveDoc,
      },
      { id: "article", label: "Feature article", doc: magazineArticleDoc },
      { id: "front", label: "Issue front page", doc: magazineFrontDoc },
      { id: "widgets", label: "2×4 widgets", doc: magazineWidgetsDoc, layout: "phone" },
    ],
    playgroundSample: magazineFullPlaygroundSample,
    toolProvider: demoToolProvider,
  },
];

export const DEFAULT_STYLE_ID = STYLES[0].id;
