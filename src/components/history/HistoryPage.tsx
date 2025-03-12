"use client";

import { useState } from "react";
import { useHistoricalData } from "@/hooks/useHistoricalData";
import DateTimePicker from "./DateTimePicker";
import HistoryChart from "./HistoryChart";
import { HistoricalDataQuery } from "@/lib/types";

export default function HistoryPage() {
  const { data, loading, error, fetchHistoricalData } = useHistoricalData();
  const [sensorType, setSensorType] = useState<"pm25" | "temperature" | "mq3">("pm25");

  const handleFetchData = (query: HistoricalDataQuery) => {
    fetchHistoricalData(query);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ข้อมูลย้อนหลัง</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <DateTimePicker onSearch={handleFetchData} />
      </div>
      
      {loading && (
        <div className="flex justify-center p-8">กำลังโหลดข้อมูล...</div>
      )}
      
      {error && <div className="text-red-500 p-4">{error}</div>}
      
      {!loading && !error && data.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">ผลลัพธ์</h2>
            <div className="text-sm text-gray-500">
              {data.length} รายการ
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-hidden">
            <HistoryChart data={data} sensorType={sensorType} />
          </div>
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          ไม่พบข้อมูลในช่วงเวลาที่เลือก กรุณาเลือกช่วงเวลาอื่น
        </div>
      )}
    </div>
  );
}