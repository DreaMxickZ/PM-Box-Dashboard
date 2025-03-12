"use client";

import { useSensorData } from "@/hooks/useSensorData";
import SensorCard from "./SensorCard";
import SensorChart from "./SensorChart";
import PM25GaugeChart from "./PM25GaugeChart";

export default function DashboardPage() {
  const { data, loading, error } = useSensorData();

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sensor Dashboard</h1>
      
      {/* PM2.5 Gauge Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-medium mb-4 text-center">คุณภาพอากาศ PM2.5</h2>
        <PM25GaugeChart value={data?.pm25 || 0} />
      </div>
      
      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorCard
          title="Temperature"
          value={data?.temperature || 0}
          unit="°C"
          icon="temperature"
        />
        <SensorCard
          title="Humidity"
          value={data?.humidity || 0}
          unit="%"
          icon="humidity"
        />
        <SensorCard
          title="Alcohol (MQ-3)"
          value={data?.mq3 || 0}
          unit="ppm"
          icon="alcohol"
        />
        <SensorCard
          title="PM 1.0"
          value={data?.pm10 || 0}
          unit="μg/m³"
          icon="particle"
        />
        <SensorCard
          title="PM 2.5"
          value={data?.pm25 || 0}
          unit="μg/m³"
          icon="particle"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Trends</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-center mb-2 font-medium">Temperature Trend</h3>
            <SensorChart data={data} sensorType="temperature" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-center mb-2 font-medium">Humidity Trend</h3>
            <SensorChart data={data} sensorType="humidity" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-center mb-2 font-medium">MQ-3 Trend</h3>
            <SensorChart data={data} sensorType="mq3" />
          </div>
        </div>
      </div>
    </div>
  );
}