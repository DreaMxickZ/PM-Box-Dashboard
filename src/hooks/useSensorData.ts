// src/hooks/useSensorData.ts
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { SensorData } from "@/lib/types";

export function useSensorData() {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const latestDataRef = ref(database, `sensor_data/${today}`);
    
    const unsubscribe = onValue(latestDataRef, (snapshot) => {
      try {
        setLoading(true);
        const data = snapshot.val();
        
        if (data) {
          // Get the latest timestamp (we're using timestamps as keys)
          const timestamps = Object.keys(data).sort().reverse();
          if (timestamps.length > 0) {
            const latestData = data[timestamps[0]];
            
            // แก้ไขตาม structure จริง
            setData({
              mq3: latestData.alcohol,
              humidity: latestData.humidity,
              pm10: latestData.pm10,
              pm25: latestData.pm25,
              temperature: latestData.temperature,
              timestamp: latestData.timestamp || timestamps[0]
            });
          }
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sensor data");
        setLoading(false);
      }
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  return { data, loading, error };
}