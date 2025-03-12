import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SensorData } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SensorChartProps {
  data: SensorData | null;
  sensorType: "temperature" | "humidity" | "mq3";
}

export default function SensorChart({ data, sensorType }: SensorChartProps) {
  // Labels สำหรับแกน X
  const mockTimeLabels = ["1h ago", "45m ago", "30m ago", "15m ago", "Now"];
  
  // ฟังก์ชันสร้างข้อมูลจำลองสำหรับแต่ละประเภทของเซนเซอร์
  const generateMockData = (current: number) => {
    const variation = current * 0.1; // 10% variation
    return [
      current - variation * 0.8,
      current - variation * 0.4,
      current - variation * 0.1,
      current + variation * 0.2,
      current,
    ];
  };
  
  // กำหนดค่าเริ่มต้น
  let currentValue = 0;
  let label = "";
  let color = "";
  let bgColor = "";
  
  // กำหนดค่าตามประเภทเซนเซอร์
  switch(sensorType) {
    case "temperature":
      currentValue = data?.temperature || 25;
      label = "Temperature (°C)";
      color = "rgb(255, 99, 132)";
      bgColor = "rgba(255, 99, 132, 0.5)";
      break;
    case "humidity":
      currentValue = data?.humidity || 50;
      label = "Humidity (%)";
      color = "rgb(54, 162, 235)";
      bgColor = "rgba(54, 162, 235, 0.5)";
      break;
    case "mq3":
      currentValue = data?.mq3 || 100;
      label = "MQ-3 (ppm)";
      color = "rgb(153, 102, 255)";
      bgColor = "rgba(153, 102, 255, 0.5)";
      break;
  }
  
  const chartData = {
    labels: mockTimeLabels,
    datasets: [
      {
        label: label,
        data: generateMockData(currentValue),
        borderColor: color,
        backgroundColor: bgColor,
        tension: 0.3,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: sensorType !== "temperature",
      }
    },
  };

  return <Line options={options} data={chartData} />;
}