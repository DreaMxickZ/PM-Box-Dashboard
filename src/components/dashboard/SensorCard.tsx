import { 
  FaTemperatureHigh, 
  FaTint, 
  FaWineBottle, 
  FaSmog
} from "react-icons/fa";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
}

export default function SensorCard({ title, value, unit, icon }: SensorCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <FaTemperatureHigh className="h-8 w-8 text-orange-500" />;
      case "humidity":
        return <FaTint className="h-8 w-8 text-blue-500" />;
      case "alcohol":
        return <FaWineBottle className="h-8 w-8 text-purple-500" />;
      case "particle":
        return <FaSmog className="h-8 w-8 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{value.toFixed(1)}</p>
            <p className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </p>
          </div>
        </div>
        <div>{getIcon()}</div>
      </div>
    </div>
  );
}