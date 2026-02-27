const CategoriesTabNavSkeleton = () => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-3 py-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="shimmer h-7.25 min-w-56 w-20 rounded-full"
        />
      ))}
    </div>
  );
};

export default CategoriesTabNavSkeleton;
