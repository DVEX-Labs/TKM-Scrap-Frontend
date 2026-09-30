import { useMemo } from "react";

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function OrderMonthCalendar({ monthDate, selectedDate, orderDateKeys, onSelectDate, onPrevMonth, onNextMonth }) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < startWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  }, [year, month]);

  const monthLabel = monthDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="bg-[#F9FBF9] border border-gray-100 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onPrevMonth}
          className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-white rounded-lg border border-gray-200 transition-colors"
        >
          Prev
        </button>
        <p className="text-sm font-bold text-gray-900">{monthLabel}</p>
        <button
          type="button"
          onClick={onNextMonth}
          className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-white rounded-lg border border-gray-200 transition-colors"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-gray-400 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-9" />;
          }

          const key = toDateKey(date);
          const isSelected = key === selectedDate;
          const hasOrder = orderDateKeys.has(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(key)}
              className={`relative h-9 rounded-lg text-xs font-semibold transition-colors ${
                isSelected
                  ? "bg-[#18931D] text-white"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              {date.getDate()}
              {hasOrder && (
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-[#18931D]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { toDateKey };
export default OrderMonthCalendar;
