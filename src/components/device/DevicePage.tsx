"use client";

import { useSensorData } from "@/hooks/useSensorData";
import SensorReading from "./SensorReading";
import { format } from "date-fns";

export default function DevicePage() {
  const { data, loading, error } = useSensorData();

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  // Format timestamp for display
  const formattedTime = data?.timestamp 
  ? data.timestamp
  : "Unknown";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Device Sensors</h1>
        <div className="text-sm text-gray-500">
          Last updated: {formattedTime}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-6">
            <SensorReading
              label="Temperature"
              value={data?.temperature || 0}
              unit="°C"
              min={-10}
              max={50}
              warning={30}
              critical={40}
            />
            <SensorReading
              label="Humidity"
              value={data?.humidity || 0}
              unit="%"
              min={0}
              max={100}
              warning={80}
              critical={90}
            />
            <SensorReading
              label="Alcohol (MQ-3)"
              value={data?.mq3 || 0}
              unit="ppm"
              min={0}
              max={1000}
              warning={400}
              critical={800}
            />
            <SensorReading
              label="PM 1.0"
              value={data?.pm10 || 0}
              unit="μg/m³"
              min={0}
              max={250}
              warning={100}
              critical={200}
            />
            <SensorReading
              label="PM 2.5"
              value={data?.pm25 || 0}
              unit="μg/m³"
              min={0}
              max={250}
              warning={50}
              critical={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}