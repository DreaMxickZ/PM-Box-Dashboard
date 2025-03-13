# PM Box: Air Quality Monitoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Arduino](https://img.shields.io/badge/Arduino-ESP8266-blue.svg)](https://www.arduino.cc/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

A complete IoT air quality monitoring system with ESP8266/ESP32 hardware sensors and a responsive web dashboard. The system measures PM2.5, PM10, temperature, humidity, and alcohol levels, sending data to Firebase for real-time visualization and analysis.

![PM Box System](https://via.placeholder.com/800x400?text=PM+Box+System)

## Project Overview

This project consists of two main components:
1. **Hardware Sensor Unit** - Arduino-based system that collects environmental data
2. **Web Dashboard** - Responsive Next.js application for real-time monitoring and data analysis

## Features

- **Real-time monitoring** of PM2.5, PM10, temperature, humidity, and alcohol levels
- **Automatic data collection** and storage in Firebase Realtime Database
- **Interactive dashboard** with responsive design for all device sizes
- **Historical data analysis** with customizable date/time filters
- **Timestamp synchronization** via NTP
- **Clean, modern UI** built with Tailwind CSS

## Live Demo

Visit the live dashboard: [PM Box Dashboard](https://pm-box-dashboard.vercel.app)

---

# 1. Hardware Sensor Unit

## Hardware Requirements

- ESP8266 or ESP32 development board
- PMS5003/PMS7003 particulate matter sensor
- DHT22/DHT11 temperature and humidity sensor
- MQ-3 alcohol sensor
- Jumper wires
- 5V power supply
- Enclosure (recommended for protection)

## Wiring Diagram

| Sensor | Arduino Pin | Description |
|--------|-------------|-------------|
| PMS5003 TX | D3 (GPIO 0) | PM Sensor data transmission |
| PMS5003 VCC | 5V | Power supply |
| PMS5003 GND | GND | Ground |
| DHT22 DATA | D4 (GPIO 2) | Temperature/humidity data |
| DHT22 VCC | 3.3V | Power supply |
| DHT22 GND | GND | Ground |
| MQ-3 AO | A0 | Alcohol sensor analog output |
| MQ-3 VCC | 3.3V | Power supply |
| MQ-3 GND | GND | Ground |

## Software Setup

### Prerequisites

- [Arduino IDE](https://www.arduino.cc/en/software) (1.8.x or newer)
- Required libraries:
 - ESP8266WiFi or WiFiESP32
 - FirebaseESP8266 or FirebaseESP32
 - SoftwareSerial
 - DHT sensor library
 - ArduinoJson (version 6.x)
 - NTPClient

### Installation

1. Clone this repository:
git clone https://github.com/yourusername/pm-box.git
2. Open the `arduino/PM_Box_Arduino/PM_Box_Arduino.ino` file in Arduino IDE

3. Install required libraries via Arduino Library Manager

4. Configure your WiFi and Firebase settings in the `config.h` file:
```cpp
// WiFi settings
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Firebase settings
#define FIREBASE_HOST "pm-box-data-visual-default-rtdb.asia-southeast1.firebaseapp.com" 
#define FIREBASE_AUTH "YOUR_FIREBASE_AUTH_KEY"

// Time settings
#define NTP_SERVER "pool.ntp.org"
#define GMT_OFFSET_SEC 7 * 3600  // Thailand time zone (GMT+7)

5. Upload the sketch to your ESP8266/ESP32 board
```

### Installation Arduino Code Overview
```cpp
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SoftwareSerial.h>
#include <DHT.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>

// Configuration definitions
// ... (as above)

// Sensor pins
#define DHTPIN D4
#define DHTTYPE DHT22
#define MQ3_PIN A0

// Software serial for PMS sensor
SoftwareSerial pmsSerial(D3, D2); // RX, TX

// Initialize sensors
DHT dht(DHTPIN, DHTTYPE);

// Firebase objects
FirebaseData firebaseData;
FirebaseJson json;

// NTP settings for time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_SERVER, GMT_OFFSET_SEC);

// Global variables
float temperature = 0;
float humidity = 0;
float alcoholValue = 0;
int pm10 = 0;
int pm25 = 0;
unsigned long lastSensorRead = 0;
unsigned long lastFirebaseUpdate = 0;

void setup() {
  Serial.begin(9600);
  pmsSerial.begin(9600);
  dht.begin();
  
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  
  // Configure Firebase timeout
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  // Start NTP client
  timeClient.begin();
}

void loop() {
  // Update time
  timeClient.update();
  
  // Read sensors every 2 seconds
  if (millis() - lastSensorRead > 2000) {
    readSensors();
    lastSensorRead = millis();
  }
  
  // Update Firebase every 1 minute
  if (millis() - lastFirebaseUpdate > 60000) {
    updateFirebase();
    lastFirebaseUpdate = millis();
  }
}

// Implementation of readSensors(), readPMSensor(), and updateFirebase() functions
// ... (see full code in the repository)
```



