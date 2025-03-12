import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SensorData } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HistoryChartProps {
  data: SensorData[];
  sensorType?: "pm25" | "temperature" | "mq3";
}

export default function HistoryChart({ data, sensorType = "pm25" }: HistoryChartProps) {
  const chartRef = useRef<any>(null);

  // สร้างฟังก์ชันกำหนดสีตามค่า PM2.5
  const getColorForPM25 = (value: number) => {
    if (value <= 15) return 'rgb(0, 153, 76)'; // เขียว
    if (value <= 25) return 'rgb(0, 112, 192)'; // ฟ้า
    if (value <= 37.5) return 'rgb(255, 212, 0)'; // เหลือง
    return 'rgb(255, 153, 0)'; // ส้ม
  };

  // จัดรูปแบบเวลาจาก timestamp
  const formatTimeLabels = (timestamp: string) => {
    if (!timestamp) return "";
    // แปลง format จาก "2025-03-12 16-08-00" หรือ "16-08-00" เป็น "16:00"
    let timeStr = timestamp;
    
    // กรณีมี format เป็น "2025-03-12 16-08-00"
    if (timestamp.includes(" ")) {
      timeStr = timestamp.split(" ")[1];
    }
    
    // ตัดเอาเฉพาะชั่วโมง
    const hour = timeStr.split("-")[0];
    return `${hour}:00`;
  };

  // เพิ่มฟังก์ชันจัดกลุ่มข้อมูลตามชั่วโมง (เก็บค่าแรกของแต่ละชั่วโมง)
  const groupDataByHour = (data: SensorData[]): SensorData[] => {
    if (!data || data.length === 0) return [];
    
    // สร้าง Map เพื่อเก็บค่าแรกของแต่ละชั่วโมง
    const hourlyData: {[key: string]: SensorData} = {};
    
    // วนลูปผ่านข้อมูลและเก็บค่าแรกของแต่ละชั่วโมง
    data.forEach(item => {
      if (!item || !item.timestamp) return;
      
      const hourKey = formatTimeLabels(item.timestamp);
      
      // เก็บค่าแรกของแต่ละชั่วโมงเท่านั้น
      if (!hourlyData[hourKey]) {
        hourlyData[hourKey] = {
          ...item,
          timestamp: hourKey // ใช้ชั่วโมงเป็น timestamp
        };
      }
    });
    
    // แปลงเป็น array และจัดเรียง
    return Object.values(hourlyData)
      .sort((a, b) => {
        // เรียงตามเวลา
        const hourA = parseInt(a.timestamp.split(':')[0]);
        const hourB = parseInt(b.timestamp.split(':')[0]);
        return hourA - hourB;
      });
  };

  // ใช้ฟังก์ชันจัดกลุ่มข้อมูล
  const hourlyData = groupDataByHour(data);
  
  // เตรียมข้อมูลสำหรับแสดงผล
  const labels = hourlyData.map(item => item.timestamp);
  
  // เลือกค่าตามประเภทเซนเซอร์
  const values = hourlyData.map(item => {
    switch(sensorType) {
      case "pm25": return item.pm25;
      case "temperature": return item.temperature;
      case "mq3": return item.mq3;
      default: return item.pm25;
    }
  });
  
  // สร้างสีตามค่า PM2.5
  const backgroundColor = sensorType === "pm25" 
    ? values.map(value => getColorForPM25(value))
    : 'rgb(75, 192, 192)';

  const chartData = {
    labels,
    datasets: [
      {
        label: sensorType === "pm25" ? "PM2.5 (μg/m³)" : 
               sensorType === "temperature" ? "Temperature (°C)" : "MQ-3 (ppm)",
        data: values,
        backgroundColor,
        borderWidth: 1,
      }
    ],
  };

  // แก้ไขแล้วเพื่อแก้ปัญหา TypeScript
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: true,
        }
      }
    }
  };

  // ดึงข้อมูลล่าสุดอย่างปลอดภัย
  const lastItem = data.length > 0 ? data[data.length - 1] : null;
  const temperature = lastItem?.temperature !== undefined ? lastItem.temperature.toFixed(1) : "0";
  const humidity = lastItem?.humidity !== undefined ? lastItem.humidity : "0";
  const mq3 = lastItem?.mq3 !== undefined ? lastItem.mq3.toFixed(1) : "0";

  return (
    <div className="relative">
      {/* แสดงข้อมูลอุณหภูมิและความชื้นล่าสุด */}
      <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">☀️</span>
          <span>{temperature}°C</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-500 mr-1">💧</span>
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center">
          <span className="text-purple-500 mr-1">🍷</span>
          <span>{mq3} ppm</span>
        </div>
      </div>

      {hourlyData.length > 0 ? (
        <div className="h-64 w-full">
          <Bar ref={chartRef} options={options} data={chartData} />
        </div>
      ) : (
        <div className="h-64 w-full flex items-center justify-center text-gray-500">
          ไม่พบข้อมูลในช่วงเวลาที่เลือก
        </div>
      )}
    </div>
  );
}