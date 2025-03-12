import { useState } from "react";
import { HistoricalDataQuery } from "@/lib/types";

interface DateTimePickerProps {
  onSearch: (query: HistoricalDataQuery) => void;
}

export default function DateTimePicker({ onSearch }: DateTimePickerProps) {
  const today = new Date().toISOString().split("T")[0];
  
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("23:59");

  const handleSearch = () => {
    onSearch({
      date,
      startTime,
      endTime,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            วันที่
          </label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
          />
        </div>
        
        <div>
          <label
            htmlFor="start-time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            เวลาเริ่มต้น
          </label>
          <input
            type="time"
            id="start-time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        
        <div>
          <label
            htmlFor="end-time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            เวลาสิ้นสุด
          </label>
          <input
            type="time"
            id="end-time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={handleSearch}
        >
          ค้นหา
        </button>
      </div>
    </div>
  );
}