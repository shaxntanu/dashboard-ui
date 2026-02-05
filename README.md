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
├── components/              # Reusable UI widgets
│   ├── AlarmBanner.tsx     # Critical alarm notification banner
│   ├── Counter.tsx         # Numeric counter display component
│   ├── Gauge.tsx           # Semi-circular gauge meter
│   ├── LinePlot.tsx        # Real-time line chart component
│   └── SegmentBar.tsx      # Track segment visualization bar
├── layout/                  # Dashboard layout components
│   ├── DashboardGrid.tsx   # Main grid layout container
│   ├── TopStatsRow.tsx     # Top statistics row
│   ├── GaugesRow.tsx       # Gauge meters row
│   ├── ChartsGrid.tsx      # Time-series charts grid
│   └── RightPanel.tsx      # Right sidebar with controls
├── digitalTwin/             # Physical pod visualization
│   └── PodViewer.tsx       # 3D-style pod position viewer
├── store/                   # State management (Zustand)
│   ├── telemetryStore.ts   # Main telemetry state & actions
│   └── health.ts           # Health status classification logic
├── mock/                    # Simulation engine
│   └── mockTelemetry.ts    # Physics-based mock data generator
├── styles/                  # Global styles
│   └── dashboard.css       # Dashboard styling
├── App.tsx                  # Root application component
├── ErrorBoundary.tsx        # Error handling wrapper
└── main.tsx                 # Application entry point
```

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
