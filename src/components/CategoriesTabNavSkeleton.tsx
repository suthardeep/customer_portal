const CategoriesTabNavSkeleton = () => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-3 py-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  );
};

export default CategoriesTabNavSkeleton;
