import type { Category } from './types/types';

export function flattenCategoryTree(categories: Category[]): Category[] {
  const flattened: Category[] = [];

  function flatten(categoryList: Category[]): void {
    for (const category of categoryList) {
      flattened.push(category);
      if (category.children && category.children.length > 0) {
        flatten(category.children);
      }
    }
  }

  flatten(categories);
  return flattened;
}

export function sortCategoriesByLevel(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => {
    if (a.level !== b.level) {
      return a.level - b.level;
    }
    return a.name.localeCompare(b.name);
  });
}
