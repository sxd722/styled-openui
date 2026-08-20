"use client";

import type { ReactNode } from "react";
import { defineComponent } from "@openuidev/react-lang";
import {
  ContentsWidgetSchema,
  CoverWidgetSchema,
  DateWidgetSchema,
  QuoteWidgetSchema,
} from "./schema";

export {
  ContentsWidgetSchema,
  CoverWidgetSchema,
  DateWidgetSchema,
  QuoteWidgetSchema,
} from "./schema";

const WIDGET_DESCRIPTION =
  'Magazine-style phone home-screen widget (2x4 launcher cells, ~150x316dp; scales via --openui-magazine-widget-w/h). Keep text under ~60 characters.';

function WidgetChrome({
  variant,
  title,
  issue,
  children,
}: {
  variant: string;
  title: string;
  issue?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`openui-mag-widget openui-mag-widget-${variant}`}
      role="complementary"
      aria-label={`${title} widget`}
    >
      <header className="openui-mag-widget__masthead">
        <span className="openui-mag-widget__title">{title}</span>
        {issue ? <span className="openui-mag-widget__issue">{issue}</span> : null}
      </header>
      {children}
      <footer className="openui-mag-widget__folio">
        <span className="openui-mag-widget__folio-rule" aria-hidden />
        <span className="openui-mag-widget__folio-mark">❦</span>
        <span className="openui-mag-widget__folio-rule" aria-hidden />
      </footer>
    </div>
  );
}

export type MagazineCoverWidgetProps = {
  title: string;
  image: string;
  issue?: string;
  headline?: string;
};

export function MagazineCoverWidgetView({
  title,
  image,
  issue,
  headline,
}: MagazineCoverWidgetProps) {
  return (
    <WidgetChrome variant="cover" title={title} issue={issue}>
      <div className="openui-mag-widget__cover">
        <img src={image} alt="" loading="lazy" decoding="async" />
        {headline ? <p className="openui-mag-widget__headline">{headline}</p> : null}
      </div>
    </WidgetChrome>
  );
}

export type MagazineQuoteWidgetProps = {
  title: string;
  quote: string;
  attribution?: string;
  issue?: string;
};

export function MagazineQuoteWidgetView({
  title,
  quote,
  attribution,
  issue,
}: MagazineQuoteWidgetProps) {
  return (
    <WidgetChrome variant="quote" title={title} issue={issue}>
      <blockquote className="openui-mag-widget__quote">
        <p className="openui-mag-widget__quote-text">{quote}</p>
        {attribution ? (
          <footer className="openui-mag-widget__quote-attribution">{attribution}</footer>
        ) : null}
      </blockquote>
    </WidgetChrome>
  );
}

export type MagazineContentsWidgetProps = {
  title: string;
  items: string[];
  issue?: string;
};

export function MagazineContentsWidgetView({
  title,
  items,
  issue,
}: MagazineContentsWidgetProps) {
  return (
    <WidgetChrome variant="contents" title={title} issue={issue}>
      <ol className="openui-mag-widget__contents">
        {items.slice(0, 3).map((item, i) => (
          <li key={i} className="openui-mag-widget__contents-item">
            <span className="openui-mag-widget__contents-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="openui-mag-widget__contents-title">{item}</span>
          </li>
        ))}
      </ol>
    </WidgetChrome>
  );
}

export type MagazineDateWidgetProps = {
  title: string;
  date?: string;
  day?: number;
  issue?: string;
};

export function MagazineDateWidgetView({ title, date, day, issue }: MagazineDateWidgetProps) {
  return (
    <WidgetChrome variant="date" title={title} issue={issue}>
      <div className="openui-mag-widget__date">
        <span className="openui-mag-widget__date-day">{day ?? new Date().getDate()}</span>
        {date ? <span className="openui-mag-widget__date-label">{date}</span> : null}
      </div>
    </WidgetChrome>
  );
}

export const CoverWidget = defineComponent({
  name: "CoverWidget",
  props: CoverWidgetSchema,
  description: `${WIDGET_DESCRIPTION} Cover variant: publication title, cover image, optional issue label and cover headline.`,
  component: ({ props }) => (
    <MagazineCoverWidgetView
      title={props.title}
      image={props.image}
      issue={props.issue}
      headline={props.headline}
    />
  ),
});

export const QuoteWidget = defineComponent({
  name: "QuoteWidget",
  props: QuoteWidgetSchema,
  description: `${WIDGET_DESCRIPTION} Quote-of-the-day variant: publication title, quote text, optional attribution.`,
  component: ({ props }) => (
    <MagazineQuoteWidgetView
      title={props.title}
      quote={props.quote}
      attribution={props.attribution}
      issue={props.issue}
    />
  ),
});

export const ContentsWidget = defineComponent({
  name: "ContentsWidget",
  props: ContentsWidgetSchema,
  description: `${WIDGET_DESCRIPTION} Contents variant: publication title plus up to 3 short headlines.`,
  component: ({ props }) => (
    <MagazineContentsWidgetView title={props.title} items={props.items} issue={props.issue} />
  ),
});

export const DateWidget = defineComponent({
  name: "DateWidget",
  props: DateWidgetSchema,
  description: `${WIDGET_DESCRIPTION} Date variant: big day numeral (day, defaults to today) with a date label beneath.`,
  component: ({ props }) => (
    <MagazineDateWidgetView title={props.title} date={props.date} day={props.day} issue={props.issue} />
  ),
});
