import { Renderer } from "@openuidev/react-lang";

import type { StylePage, StyleRegistration } from "../registry";

/** Renders one demo page of a style: a plain page, or the phone frame. */
export function StylePageView({
  registration,
  page,
}: {
  registration: StyleRegistration;
  page: StylePage;
}) {
  const content = (
    <Renderer
      response={page.doc ?? ""}
      library={registration.library}
      toolProvider={registration.toolProvider ?? null}
    />
  );
  if (page.layout === "phone") {
    return (
      <div className="demo-phone">
        <div className="demo-phone__screen">{content}</div>
      </div>
    );
  }
  return content;
}
