# PM Box Dashboard

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A responsive web dashboard for monitoring and visualizing air quality data collected from the PM Box sensor system. The dashboard provides real-time data display, historical data analysis, and device monitoring capabilities.

![Dashboard Preview](https://via.placeholder.com/800x400?text=PM+Box+Dashboard)

## Features

- **Real-time monitoring** of PM2.5, PM10, temperature, humidity, and alcohol levels
- **Interactive dashboard** with responsive design for all device sizes
- **Device status** visualization with gauges and indicators
- **Historical data analysis** with customizable date/time filters
- **Clean, modern UI** built with Tailwind CSS and shadcn/ui components
- **Firebase integration** for real-time data synchronization

## Technologies Used

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Data Visualization**: Chart.js, react-chartjs-2
- **Backend/Database**: Firebase Realtime Database
- **Deployment**: Vercel



## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Firebase account with Realtime Database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PM-Box-Dashboard.git
   cd PM-Box-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root and add your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open http://localhost:3000 in your browser to view the dashboard.

## Folder Structure

```
sensor-dashboard/
├── public/                 # Static assets
├── src/
│   ├── app/                # Page components using Next.js App Router
│   │   ├── page.tsx        # Home/Dashboard page
│   │   ├── device/page.tsx # Device page
│   │   ├── history/page.tsx # History page
│   │   └── layout.tsx      # Root layout component
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── device/         # Device monitoring components
│   │   ├── history/        # Historical data components
│   │   └── layout/         # Layout components (navbar, etc.)
│   ├── hooks/              # Custom React hooks
│   │   ├── useSensorData.ts # Hook for fetching current sensor data
│   │   └── useHistoricalData.ts # Hook for fetching historical data
│   └── lib/                # Utility functions and types
│       ├── firebase.ts     # Firebase configuration
│       └── types.ts        # TypeScript type definitions
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## Firebase Database Structure

The dashboard expects data in the following Firebase Realtime Database structure:

```
sensor_data/
  2025-03-12/               # Date (YYYY-MM-DD)
    16-08-00/               # Time (HH-MM-SS)
      temperature: 27.3
      humidity: 65.5
      alcohol: 2.9
      pm10: 45.2
      pm25: 22.7
      timestamp: "2025-03-12 16-08-00"
```

## Features Breakdown

### Dashboard

- Overview of all sensor data with visual cards
- PM2.5 gauge chart with air quality indicators
- Historical trends for temperature, humidity, and MQ-3 sensors

### Device

- Real-time sensor readings with progress bars
- Status indicators for each sensor
- Visual alerts for abnormal readings

### History

- Date and time range selector
- Historical data visualization with bar charts
- Color-coded PM2.5 levels based on air quality standards

## Deployment

The easiest way to deploy the dashboard is using Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

Alternatively, you can build the application for production:
```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js for the React framework
- Tailwind CSS for styling
- Chart.js for data visualization
- Firebase for the real-time database
- Vercel for hosting

---

Project maintained by Your Name
