function ScrapCardSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gray-100" />
          <div className="p-3.5 space-y-2">
            <div className="h-2.5 w-16 bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-8 w-full bg-gray-100 rounded-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrapCardSkeleton;
