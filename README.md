# Hyperloop Control Dashboard UI

A real-time visualization interface for monitoring and controlling a Hyperloop pod. Built with React and Vite, this dashboard provides operators with critical telemetry data including speed, power consumption, thermal status, and track segment health.

![Status](https://img.shields.io/badge/Status-Development-blue)
![Tech](https://img.shields.io/badge/Tech-React_|_Zustand_|_Vite-61DAFB)
![License](https://img.shields.io/badge/License-MIT-green)

## Features
- **Real-Time Telemetry**: Visualizes high-frequency data (10Hz+) for pod speed, battery voltage, and inverter temperature
- **Health Monitoring**: Automatic classification of system health states (Nominal, Degraded, Critical/Emergency)
- **Track Digital Twin**: Live tracking of the pod's position along track segments with thermal and power load monitoring
- **Safety Controls**: 
  - Emergency Stop button for immediate pod halt
  - Restart button to reset simulation
  - Fault injection system for testing failure scenarios
  - Alarm acknowledgement workflows
- **Mock Simulation**: Built-in physics-based telemetry engine to simulate pod behavior without hardware

## Tech Stack
- **React 18** with TypeScript
- **Vite** with SWC for fast builds
- **Zustand** for state management
- **Custom CSS** for styling
- **SVG-based** custom gauges and real-time line plots

## Project Structure
```
src/
├── components/          # Reusable UI widgets (Gauges, Counters, Plots)
├── layout/              # Dashboard grid layouts and panels
├── digitalTwin/         # Visualization of the physical pod
├── store/               # State management & business logic (Zustand)
│   ├── telemetryStore.ts   # Main store & mock engine integration
│   └── health.ts           # Health classification logic
├── mock/                # Physics simulation for test data
└── App.tsx              # Application entry point
```

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn

### Installation

Clone the repository:
```bash
git clone https://github.com/shaxntanu/dashboard-ui.git
cd dashboard-ui
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```
The output will be in the `dist/` directory.

## Simulation Controls

The dashboard starts in mock simulation mode by default:

- **Start**: Begins the pod acceleration profile
- **Stop**: Decelerates the pod
- **Emergency Stop**: Immediately triggers a critical fault state and halts the pod
- **Restart**: Resets the entire simulation to initial state
- **Inject Fault**: (Available in code) Triggers warning/critical messages to test the alarm banner

## Changelog

### February 5, 2026 - Major UI/UX Improvements

**Gauge Visualization Enhancements**
- Fixed gauge meter orientation - meters now display correctly as bottom semicircles with proper left-to-right value progression
- Improved needle positioning using accurate trigonometric calculations
- Adjusted min/max label positioning to prevent overlap with gauge arcs
- Enhanced visual clarity with proper arc rendering

**Safety & Control Features**
- Added **Restart Button** alongside Emergency Stop for quick simulation reset
- Implemented visual **Safety State Indicator** - a dynamic square that:
  - Glows green during normal operations
  - Pulses red with animation during emergency stop
  - Provides instant visual feedback of system safety status
- Increased System State card height for better visibility and information hierarchy
- Enhanced Emergency Stop state visualization with red text highlighting

**Data Synchronization**
- Synchronized graph Y-axis ranges with gauge ranges for consistency:
  - Speed: 0-300 m/s (previously 0-320)
  - Power: 0-300 kW (previously 0-320)
  - Temperature: 20-110 °C (unchanged)
- Ensures real-time graphs and gauges display data on matching scales

**Documentation & Licensing**
- Updated README with clearer installation instructions
- Fixed license inconsistency - properly documented MIT License
- Improved project structure documentation
- Added comprehensive feature descriptions

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project is part of the **Ragastra** initiative.
