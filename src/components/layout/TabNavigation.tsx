"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Dashboard", href: "/" },
  { name: "Device", href: "/device" },
  { name: "History", href: "/history" },
];

export default function TabNavigation() {
  const pathname = usePathname();
  
  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${
                isActive
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}