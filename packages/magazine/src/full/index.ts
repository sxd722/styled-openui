"use client";

import { composeLibraries } from "@openui-style/core";
import { openuiLibrary } from "@openuidev/react-ui/genui-lib";

import { magazineLibrary } from "../genui-lib";

/**
 * The full magazine library: official OpenUI interactive components
 * (Stack, Card, Form, Input, Select, Button, Table, Charts, Tabs, Modal, …)
 * composed with the magazine editorial components. One library, one
 * Renderer — styled pages that can still query, filter and act.
 *
 * This entry keeps `@openuidev/react-ui` OPTIONAL for consumers of the
 * base `@openui-style/magazine` package: import
 * `@openui-style/magazine/full` only when you want the composed library.
 *
 * Also import the official styles alongside the magazine ones:
 *   import "@openuidev/react-ui/defaults.css";
 *   import "@openuidev/react-ui/index.css";
 */
export const fullMagazineLibrary = composeLibraries({
  id: "openui-style/magazine/full",
  root: "Spread",
  libraries: [openuiLibrary, magazineLibrary],
});
