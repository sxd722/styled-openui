import type { Library, PromptOptions } from "@openuidev/react-lang";
import { magazineLibrary, magazinePromptOptions } from "@openui-style/magazine";

// Style side-effect imports: tokens + component styles land in the bundle.
import "@openui-style/magazine/defaults.css";
import "@openui-style/magazine/styles/index.scss";
import "@openui-style/magazine/styles/fonts.css";

import {
  magazineArticleDoc,
  magazineFrontDoc,
  magazinePlaygroundSample,
  magazineWidgetsDoc,
} from "./content/magazine";

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
];

export const DEFAULT_STYLE_ID = STYLES[0].id;
