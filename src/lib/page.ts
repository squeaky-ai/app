import type { PageTreeItem } from 'types/pages';
import type { SitesPage } from 'types/graphql';

function insert(
  children: PageTreeItem[] = [],
  [head, ...tail]: string[],
  parentHead?: string
) {
  let child = children.find(child => child.name === head);

  if (!child) {
    const path = parentHead ? `/${parentHead}/${head}` : `/${head}`;
    child = { name: head, path, children: [] };
    children.push(child);
  }

  if (tail.length > 0) insert(child.children, tail, head);

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
  if (item.children.length === 0) {
    return selected.includes(item.path)
      ? selected.filter(s => s !== item.path)
      : [...selected, item.path];
  }

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
