// src/components/dashboard/PM25GaugeChart.tsx
import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PM25GaugeChartProps {
  value: number;
}

export default function PM25GaugeChart({ value }: PM25GaugeChartProps) {
  const chartRef = useRef<any>(null);
  
  // กำหนดสีตามระดับ PM2.5
  const getColor = (value: number) => {
    if (value <= 15) return 'rgb(0, 153, 76)'; // ดี - เขียว
    if (value <= 25) return 'rgb(0, 112, 192)'; // ปานกลาง - ฟ้า
    if (value <= 37.5) return 'rgb(255, 212, 0)'; // เริ่มมีผลต่อสุขภาพ - เหลือง
    if (value <= 50) return 'rgb(255, 153, 0)'; // มีผลต่อสุขภาพ - ส้ม
    return 'rgb(255, 0, 0)'; // อันตราย - แดง
  };
  
  // หาระดับคุณภาพอากาศ
  const getAirQualityText = (value: number) => {
    if (value <= 15) return "ดีมาก";
    if (value <= 25) return "ดี";
    if (value <= 37.5) return "ปานกลาง";
    if (value <= 50) return "เริ่มมีผลต่อสุขภาพ";
    return "มีผลต่อสุขภาพ";
  };

  const maxValue = 100; // ค่าสูงสุดของ gauge
  const gaugeData = {
    labels: ['PM2.5', 'Remaining'],
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: [
          getColor(value),
          'rgba(220, 220, 220, 0.5)'
        ],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  const airQualityText = getAirQualityText(value);
  const color = getColor(value);

  return (
    <div className="relative h-48 flex flex-col items-center">
      <div className="w-full h-32">
        <Doughnut ref={chartRef} data={gaugeData} options={options} />
      </div>
      <div className="absolute top-16 flex flex-col items-center">
        <div className="text-3xl font-bold" style={{color}}>
          {value}
        </div>
        <div className="text-sm" style={{color}}>
          μg/m³
        </div>
        <div className="mt-1 text-sm font-medium" style={{color}}>
          {airQualityText}
        </div>
      </div>
    </div>
  );
}