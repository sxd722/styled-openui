// Fake tool backend for the demo: enough shape for Query()/Mutation() demos.
import type { ToolDescriptor } from "@openuidev/react-lang";

export interface ArchiveArticle {
  title: string;
  section: string;
  author: string;
}

const ARCHIVE: ArchiveArticle[] = [
  { title: "The Quiet Craft of Type", section: "typography", author: "Marta Ilonka" },
  { title: "Grids That Breathe", section: "design", author: "Ada Lovelace" },
  { title: "A Field Guide to Margins", section: "essay", author: "Jonas Feld" },
  { title: "Ornaments, Considered", section: "typography", author: "Iris Kwon" },
  { title: "Ink and Its Discontents", section: "essay", author: "R. Okafor" },
  { title: "The Basel Room", section: "design", author: "Marta Ilonka" },
];

export const demoToolProvider: Record<string, (args: unknown) => Promise<unknown>> = {
  issue_stats: async () => ({
    label: `The archive holds ${ARCHIVE.length} stories across 3 sections.`,
  }),
  list_articles: async (args) => {
    const section = (args as { section?: string } | undefined)?.section;
    const rows = section && section !== "all" ? ARCHIVE.filter((a) => a.section === section) : ARCHIVE;
    return { rows };
  },
};

export const demoToolDescriptors: ToolDescriptor[] = ["issue_stats", "list_articles"];
