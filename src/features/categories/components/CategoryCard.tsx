import type { Category } from '../types/types';
import { DEFAULT_CATEGORY_IMAGE } from '../constants';
import { cn } from '@/utils/cssHelpers';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const breadcrumbPath = category.fullPath
    .split('/')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' > ');

  const levelColors = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  ];

  const levelColor = levelColors[category.level] || levelColors[0];

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1',
        'dark:border-gray-700 dark:bg-gray-800',
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={category.image || DEFAULT_CATEGORY_IMAGE}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              levelColor,
            )}
          >
            Level {category.level}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          {category.name}
        </h3>
        <p className="mt-auto text-sm text-gray-500 dark:text-gray-400">
          {breadcrumbPath}
        </p>
      </div>
    </div>
  );
}
