// src/lib/types.ts
export interface SensorData {
  mq3: number;  // เทียบเท่ากับ alcohol ใน Firebase
  humidity: number;
  pm10: number;
  pm25: number;
  temperature: number;
  timestamp: string;
}

export interface HistoricalDataQuery {
  date: string;
  startTime: string;
  endTime: string;
}