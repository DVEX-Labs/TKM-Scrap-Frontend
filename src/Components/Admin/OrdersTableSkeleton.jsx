function OrdersTableSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-12 bg-gray-100 rounded-lg" />
      ))}
    </div>
  );
}

export default OrdersTableSkeleton;
