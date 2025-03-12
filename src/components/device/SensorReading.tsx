interface SensorReadingProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warning: number;
  critical: number;
}

export default function SensorReading({
  label,
  value,
  unit,
  min,
  max,
  warning,
  critical,
}: SensorReadingProps) {
  // Calculate percentage for progress bar
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  // Determine status
  let status = "normal";
  let statusColor = "bg-green-500";
  
  if (value >= critical) {
    status = "critical";
    statusColor = "bg-red-500";
  } else if (value >= warning) {
    status = "warning";
    statusColor = "bg-yellow-500";
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{label}</span>
        <span className="text-sm font-medium">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className={`${statusColor} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>{min} {unit}</span>
        <span className="capitalize">{status}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}