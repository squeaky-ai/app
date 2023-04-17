import type { PageTreeItem } from 'types/pages';
import type { SitesPage } from 'types/graphql';

function insert(
  children: PageTreeItem[] = [],
  [head, ...tail]: string[],
  parentHead?: string
) {
  let child = children.find(child => child.name === head);

  const path = parentHead ? `${parentHead}/${head}` : `/${head}`;

  if (!child) {
    child = { name: head, path, children: [] };
    children.push(child);
  }

  if (tail.length > 0) insert(child.children, tail, path);

  return children;
}

function getAndFlattenAllChildren(item: PageTreeItem, flattened = [item.path]): string[] {
  item.children?.map(child => {
    flattened.push(child.path); 
    getAndFlattenAllChildren(child, flattened);
  });

  return flattened;
}

export function buildPagesTree(pages: SitesPage[]) {
  return pages
    .map(result => result.url.split('/').slice(1))
    .reduce((children, path) => insert(children, path), [] as PageTreeItem[]);
}

export function handleTreeUpdate(
  item: PageTreeItem,
  selected: string[],
): string[] {
  const allChildren = getAndFlattenAllChildren(item);

  const allSelected = allChildren.every(a => selected.includes(a));
  const noneSelected = allChildren.every(a => !selected.includes(a));

  if (noneSelected) {
    return [...selected, ...allChildren];
  }

  if (allSelected) {
    return selected.filter(s => !allChildren.includes(s));
  }

  const toSelect = allChildren.filter(s => !selected.includes(s));
  return [...selected, ...toSelect];
}

export function pageMatchesRoute(page: string, route: string) {
  if (!page || !route) return false;

  const pageChunks = page.replace(/\/$/, '').split('/');
  const routeChunks = route.replace(/\/$/, '').split('/');

  if (pageChunks.length !== routeChunks.length) return false;

  return routeChunks.every((chunk, index) => {
    return chunk.startsWith(':')
      ? true
      : chunk === routeChunks[index];
  });
}
