import type { SitesPage } from "types/graphql";

export interface PageTreeItem {
  name: string;
  path: string;
  children: PageTreeItem[];
}

function insert(children: PageTreeItem[] = [], [head, ...tail]: string[], fullPath: string) {
  let child = children.find(child => child.name === head);
  if (!child) children.push(child = { name: head, path: fullPath, children: [] });
  if (tail.length > 0) insert(child.children, tail, fullPath);
  return children;
}

export function buildNestedPagesStructure(pages: SitesPage[]) {
  return pages
    .map(result => ({ path: result.url.split('/').slice(1), fullPath: result.url }))
    .reduce((children, { path, fullPath }) => insert(children, path, fullPath), [] as PageTreeItem[]);
}
