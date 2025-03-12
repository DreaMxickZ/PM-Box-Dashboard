import { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { SensorData, HistoricalDataQuery } from "@/lib/types";

export function useHistoricalData() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalData = async (query: HistoricalDataQuery) => {
    setLoading(true);
    setError(null);
    
    try {
      const { date, startTime, endTime } = query;
      
      // แปลงรูปแบบเวลา (HH:MM เป็น HH-MM)
      const startHour = startTime.replace(':', '-');
      const endHour = endTime.replace(':', '-');
      
      console.log(`Fetching data for: ${date} from ${startHour} to ${endHour}`);
      
      // เรียกข้อมูลจาก Firebase
      const dataRef = ref(database, `sensor_data/${date}`);
      const snapshot = await get(dataRef);
      
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        console.log("Raw data from Firebase:", rawData);
        
        // กรองและแปลงข้อมูล
        const historicalData: SensorData[] = [];
        
        Object.entries(rawData).forEach(([timestamp, value]: [string, any]) => {
          // ตรวจสอบว่าเป็นชั่วโมงที่อยู่ในช่วงเวลาที่ต้องการหรือไม่
          const timeHour = parseInt(timestamp.split('-')[0]);
          const startHourValue = parseInt(startHour.split('-')[0]);
          const endHourValue = parseInt(endHour.split('-')[0]);
          
          if (timeHour >= startHourValue && timeHour <= endHourValue) {
            console.log(`Adding data for time: ${timestamp}`);
            historicalData.push({
              mq3: value.alcohol || 0,
              humidity: value.humidity || 0,
              pm10: value.pm10 || 0,
              pm25: value.pm25 || 0,
              temperature: value.temperature || 0,
              timestamp: value.timestamp || `${date} ${timestamp}`
            });
          }
        });
        
        console.log("Processed historical data:", historicalData);
        
        // เรียงตามเวลา
        historicalData.sort((a, b) => 
          a.timestamp.localeCompare(b.timestamp)
        );
        
        setData(historicalData);
      } else {
        console.log("No data found for the selected date");
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setError("ไม่สามารถดึงข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchHistoricalData };
}