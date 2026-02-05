# Hyperloop Control Dashboard UI

## 🚀 Overview
The **Hyperloop Control Dashboard** is a high-performance, real-time visualization interface designed for monitoring and controlling a Hyperloop pod. Built with **React** and **Vite**, it serves as the mission control center, providing operators with critical telemetry data including speed, power consumption, thermal status, and track segment health.

This project is part of the **Ragastra** initiative.

![Status](https://img.shields.io/badge/Status-Development-blue)
![Tech](https://img.shields.io/badge/Tech-React_|_Zustand_|_Vite-61DAFB)

## ✨ Key Features
- **Real-Time Telemetry**: Visualizes high-frequency data (10Hz+) for pod speed, battery voltage, and inverter temperature.
- **Health Monitoring**: Automatic classification of system health states (Nominal, Degraded, Critical/Emergency).
- **Track Digital Twin**: Live tracking of the pod's position along track segments with thermal and power load monitoring.
- **Safety & Control**: 
  - Integrated Emergency Stop (Software Soft-Stop).
  - Fault injection system for testing failure scenarios.
  - Alarm acknowledgement workflows.
- **Mock Simulation**: Built-in physics-based telemetry mock engine to simulate pod behavior without hardware.

## 🛠️ Tech Stack
- **Frontend Framework**: [React 18](https://reactjs.org/) (TypeScript)
- **Build Tool**: [Vite](https://vitejs.dev/) (SWC)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: CSS Modules / Custom CSS
- **Visualization**: SVG-based custom gauges and real-time line plots.

## 📂 Project Structure
```
src/
├── components/       # Reusable UI widgets (Gauges, Counters, Plots)
├── layout/           # Dashboard grid layouts and panels
├── digitalTwin/      # Visualization of the physical pod
├── store/            # State management & business logic (Zustand)
│   ├── telemetryStore.ts  # Main store & mock engine integration
│   └── health.ts          # Health classification logic
├── mock/             # Physics simulation for test data
└── App.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ragastra/dashboard-ui.git
   cd dashboard-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

### Building for Production
To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` directory, ready for deployment.

## 🕹️ Simulation Controls
The dashboard starts in a "Mock" mode by default.
- **Start Run**: Begins the pod acceleration profile.
- **Stop Run**: Decelerates the pod.
- **Emergency Stop**: Immediately triggers a critical fault state.
- **Inject Fault**: (Available in code) triggers warning/critical messages to test the alarm banner.

## 🤝 Contribution
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
This project is proprietary to **Ragastra**. Unauthorized copying of this file, via any medium, is strictly prohibited.
