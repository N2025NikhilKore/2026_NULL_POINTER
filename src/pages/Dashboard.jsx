import { useState } from "react";
import {
  FaWater,
  FaSignOutAlt
} from "react-icons/fa";

export default function Dashboard() {
  const [leakDetected, setLeakDetected] = useState(false);

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <FaWater />
          <span>AquaGuard AI</span>
        </div>

        <nav>
          <button>🏠 Dashboard</button>
          <button>📊 Analytics</button>
          <button>📄 Reports</button>
          <button>⚙️ Settings</button>
        </nav>

        <button className="logout">
          <FaSignOutAlt />
          Logout
        </button>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Water Network Dashboard</h1>
            <p>
              Real-time monitoring & AI leak detection
            </p>
          </div>

          <div className="admin">
            <span className="online-dot"></span>
            Admin
          </div>

        </header>


        {/* Simulation Control */}
        <div className="simulation-bar">

          <div>
            <strong>Simulation Control</strong>

            <p>
              Test the AI leak detection system
            </p>
          </div>

          <button
            className="simulate-btn"
            onClick={() =>
              setLeakDetected(!leakDetected)
            }
          >
            {leakDetected
              ? "Reset System"
              : "🚨 Simulate Leak"}
          </button>

        </div>


        {/* Status Cards */}
        <section className="stats-grid">

          <div className="stat-card">
            <span>💧 Flow Rate</span>

            <h2>
              {leakDetected
                ? "82 L/min"
                : "120 L/min"}
            </h2>

            <small>
              {leakDetected
                ? "Abnormal"
                : "Normal"}
            </small>
          </div>


          <div className="stat-card">
            <span>🔵 Pressure</span>

            <h2>
              {leakDetected
                ? "2.1 Bar"
                : "4.3 Bar"}
            </h2>

            <small>
              {leakDetected
                ? "Pressure Drop"
                : "Stable"}
            </small>
          </div>


          <div className="stat-card">
            <span>🤖 Leak Probability</span>

            <h2>
              {leakDetected
                ? "96%"
                : "4%"}
            </h2>

            <small>
              {leakDetected
                ? "⚠ High Risk"
                : "Low Risk"}
            </small>
          </div>


          <div className="stat-card">
            <span>🌊 Water Saved</span>

            <h2>220 L</h2>

            <small>Today</small>
          </div>

        </section>


        {/* Main Panels */}
        <section className="dashboard-grid">

          {/* Pipeline */}
          <div className="panel pipeline-panel">

            <h2>
              Smart Pipeline Network
            </h2>

            <div className="pipeline">

              <div className="node">
                🏭
                <span>Tank</span>
              </div>

              <div className="pipe"></div>

              <div className="node">
                ⚙️
                <span>Pump</span>
              </div>

              <div className="pipe"></div>

              <div className="node healthy">
                S1
              </div>

              <div className="pipe"></div>

              <div className="node healthy">
                S2
              </div>

              <div className="pipe"></div>

              <div
                className={
                  leakDetected
                    ? "node leak"
                    : "node healthy"
                }
              >
                S3
              </div>

              <div className="pipe"></div>

              <div className="node">
                🏠
                <span>House</span>
              </div>

            </div>

          </div>


          {/* AI Analysis */}
          <div className="panel ai-panel">

            <h2>
              🤖 AI Analysis
            </h2>

            <div className="ai-status">

              <span>
                System Status
              </span>

              <strong
                className={
                  leakDetected
                    ? "critical"
                    : ""
                }
              >
                {leakDetected
                  ? "CRITICAL"
                  : "HEALTHY"}
              </strong>

            </div>


            <div className="ai-value">

              <span>
                Leak Probability
              </span>

              <strong>
                {leakDetected
                  ? "96%"
                  : "4%"}
              </strong>

            </div>


            <div className="ai-value">

              <span>
                AI Confidence
              </span>

              <strong>
                {leakDetected
                  ? "98%"
                  : "98%"}
              </strong>

            </div>


            <div
              className={
                leakDetected
                  ? "recommendation danger"
                  : "recommendation"
              }
            >

              {leakDetected
                ? "⚠ Leak detected at Pipeline Node 3"
                : "✓ No abnormal activity detected"}

            </div>

          </div>

        </section>


        {/* Bottom Panels */}
        <section className="dashboard-grid">

          {/* Alerts */}
          <div className="panel">

            <h2>
              📡 Live Alerts
            </h2>

            {leakDetected ? (
              <>
                <div className="alert danger">
                  🚨 Water Leak Detected
                </div>

                <div className="alert danger">
                  📍 Location: Pipeline Node 3
                </div>

                <div className="alert warning">
                  ⚠ Admin Alert Generated
                </div>
              </>
            ) : (
              <>
                <div className="alert normal">
                  <span>●</span>
                  System operating normally
                </div>

                <div className="alert normal">
                  <span>●</span>
                  All sensors connected
                </div>
              </>
            )}

          </div>


          {/* Sensors */}
          <div className="panel">

            <h2>
              🎛 Sensor Status
            </h2>

            <div className="sensor-row">
              <span>
                Flow Sensor
              </span>

              <strong>
                🟢 Online
              </strong>
            </div>


            <div className="sensor-row">
              <span>
                Pressure Sensor
              </span>

              <strong>
                🟢 Online
              </strong>
            </div>


            <div className="sensor-row">
              <span>
                ESP32
              </span>

              <strong>
                🟢 Connected
              </strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}