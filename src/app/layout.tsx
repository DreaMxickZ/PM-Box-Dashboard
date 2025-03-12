import "./globals.css";
import { Inter } from "next/font/google";
import TabNavigation from "@/components/layout/TabNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sensor Dashboard",
  description: "Monitor and analyze sensor data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <main className="container mx-auto px-4 py-6">
            <TabNavigation />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}