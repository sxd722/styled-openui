"use client";

import { defineComponent } from "@openuidev/react-lang";
import { ArticleCardSchema } from "./schema";

export { ArticleCardSchema } from "./schema";

export type MagazineArticleCardProps = {
  headline: string;
  standfirst?: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
  tone?: "color" | "mono";
  layout?: "stacked" | "side";
};

export function MagazineArticleCardView({
  headline,
  standfirst,
  image,
  category,
  author,
  date,
  tone = "color",
  layout = "stacked",
}: MagazineArticleCardProps) {
  return (
    <article
      className={`openui-mag-article-card openui-mag-article-card-${layout} openui-mag-article-card-${tone}`}
    >
      {image ? (
        <div className="openui-mag-article-card__media">
          <img src={image} alt="" loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="openui-mag-article-card__body">
        {category ? <p className="openui-mag-article-card__category">{category}</p> : null}
        <h3 className="openui-mag-article-card__headline">{headline}</h3>
        {standfirst ? <p className="openui-mag-article-card__standfirst">{standfirst}</p> : null}
        {author || date ? (
          <p className="openui-mag-article-card__meta">
            {author ? <span>{author}</span> : null}
            {author && date ? <span aria-hidden> · </span> : null}
            {date ? <span>{date}</span> : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export const ArticleCard = defineComponent({
  name: "ArticleCard",
  props: ArticleCardSchema,
  description:
    'Story card for contents pages and grids: image (optional), category eyebrow, serif headline, standfirst, byline meta. layout: "stacked" (default — image above text) | "side" (image beside text). tone: "color" | "mono".',
  component: ({ props }) => (
    <MagazineArticleCardView
      headline={props.headline}
      standfirst={props.standfirst}
      image={props.image}
      category={props.category}
      author={props.author}
      date={props.date}
      tone={props.tone}
      layout={props.layout}
    />
  ),
});
