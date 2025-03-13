// src/hooks/useSensorData.ts
import { useState, useEffect } from "react";
import { ref, onValue, query, orderByKey, limitToLast, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { SensorData } from "@/lib/types";

export function useSensorData() {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ดึงข้อมูลล่าสุดโดยไม่จำกัดวัน
    async function fetchLatestData() {
      try {
        setLoading(true);
        
        // อ้างอิงไปยัง root ของ sensor_data
        const rootRef = ref(database, 'sensor_data');
        
        // ดึงข้อมูลทั้งหมดจาก sensor_data
        const snapshot = await get(rootRef);
        
        if (snapshot.exists()) {
          const allData = snapshot.val();
          
          // ค้นหาวันที่ล่าสุด
          const dates = Object.keys(allData).sort().reverse();
          
          if (dates.length > 0) {
            const latestDate = dates[0];
            const dateData = allData[latestDate];
            
            // ค้นหาเวลาล่าสุดในวันล่าสุด
            const times = Object.keys(dateData).sort().reverse();
            
            if (times.length > 0) {
              const latestTime = times[0];
              const latestData = dateData[latestTime];
              
              console.log("Latest data from:", latestDate, latestTime);
              console.log("Latest data:", latestData);
              
              if (latestData) {
                // แปลงข้อมูลให้ตรงกับ SensorData interface
                setData({
                  mq3: latestData.alcohol || 0,
                  humidity: latestData.humidity || 0,
                  pm10: latestData.pm10 || 0,
                  pm25: latestData.pm25 || 0,
                  temperature: latestData.temperature || 0,
                  timestamp: latestData.timestamp || `${latestDate} ${latestTime}`
                });
              }
            }
          } else {
            console.log("No data available");
            setData(null);
          }
        } else {
          console.log("No data available");
          setData(null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Failed to fetch sensor data");
        setLoading(false);
      }
    }
    
    // เรียกฟังก์ชันด้วย async/await
    fetchLatestData();
    
    // ตั้งค่า listener เพื่อฟังการเปลี่ยนแปลง
    const rootRef = ref(database, 'sensor_data');
    const unsubscribe = onValue(rootRef, () => {
      // เมื่อมีการเปลี่ยนแปลงข้อมูล ให้เรียกฟังก์ชันดึงข้อมูลล่าสุดอีกครั้ง
      fetchLatestData();
    });
    
    return () => unsubscribe();
  }, []);

  return { data, loading, error };
}