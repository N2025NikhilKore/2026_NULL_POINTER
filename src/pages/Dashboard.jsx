import { useState } from "react";
import { FaWater, FaSignOutAlt } from "react-icons/fa";
import SensorCharts from "../components/SensorCharts";

export default function Dashboard() {
  const [leakDetected, setLeakDetected] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);

  const createMaintenanceTicket = () => {
    setTicketCreated(true);
  };

  const resetSystem = () => {
    setLeakDetected(false);
    setTicketCreated(false);
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
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


      {/* MAIN */}
      <main className="main-content">

        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1>Water Network Dashboard</h1>
            <p>Real-time monitoring & AI leak detection</p>
          </div>

          <div className="admin">
            <span className="online-dot"></span>
            Admin
          </div>
        </header>


        {/* SIMULATION */}
        <div className="simulation-bar">
          <div>
            <strong>Simulation Control</strong>
            <p>Test the AI leak detection system</p>
          </div>

          <button
            className="simulate-btn"
            onClick={
              leakDetected
                ? resetSystem
                : () => {
                    setLeakDetected(true);
                    setTicketCreated(false);
                  }
            }
          >
            {leakDetected ? "Reset System" : "🚨 Simulate Leak"}
          </button>
        </div>


        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <span>💧 Flow Rate</span>
            <h2>{leakDetected ? "82 L/min" : "120 L/min"}</h2>
            <small className={leakDetected ? "danger-text" : ""}>
              {leakDetected ? "Abnormal" : "Normal"}
            </small>
          </div>

          <div className="stat-card">
            <span>🔵 Pressure</span>
            <h2>{leakDetected ? "2.1 Bar" : "4.3 Bar"}</h2>
            <small className={leakDetected ? "danger-text" : ""}>
              {leakDetected ? "Pressure Drop" : "Stable"}
            </small>
          </div>

          <div className="stat-card">
            <span>🤖 Leak Probability</span>
            <h2>{leakDetected ? "96%" : "4%"}</h2>
            <small className={leakDetected ? "danger-text" : ""}>
              {leakDetected ? "⚠ High Risk" : "Low Risk"}
            </small>
          </div>

          <div className="stat-card">
            <span>🌊 Water Saved</span>
            <h2>{leakDetected ? "70 L" : "220 L"}</h2>
            <small>
              {leakDetected ? "Loss Detected" : "Today"}
            </small>
          </div>

        </section>


        {/* PIPELINE + AI */}
        <section className="dashboard-grid">

          {/* PIPELINE */}
          <div className="panel pipeline-panel">
            <h2>Smart Pipeline Network</h2>

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

              <div
                className={
                  leakDetected
                    ? "pipe leak-pipe"
                    : "pipe"
                }
              ></div>

              <div
                className={
                  leakDetected
                    ? "node leak"
                    : "node healthy"
                }
              >
                S3
              </div>

              <div
                className={
                  leakDetected
                    ? "pipe leak-pipe"
                    : "pipe"
                }
              ></div>

              <div className="node">
                🏠
                <span>House</span>
              </div>

            </div>

            {leakDetected && (
              <div className="leak-location">
                📍 Leak detected near Pipeline Node 3
              </div>
            )}
          </div>


          {/* AI ANALYSIS */}
          <div className="panel ai-panel">

            <h2>🤖 AI Analysis</h2>

            <div className="ai-status">
              <span>System Status</span>

              <strong className={leakDetected ? "critical" : ""}>
                {leakDetected ? "CRITICAL" : "HEALTHY"}
              </strong>
            </div>

            <div className="ai-value">
              <span>Leak Probability</span>
              <strong>{leakDetected ? "96%" : "4%"}</strong>
            </div>

            <div className="ai-value">
              <span>AI Confidence</span>
              <strong>98%</strong>
            </div>

            <div className="ai-value">
              <span>Detected Cause</span>
              <strong>
                {leakDetected ? "Pipeline Crack" : "None"}
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
                ? "⚠ Inspect Pipeline Node 3 immediately"
                : "✓ No abnormal activity detected"}
            </div>

          </div>

        </section>


        {/* ALERTS + SENSOR */}
        <section className="dashboard-grid">

          {/* ALERTS */}
          <div className="panel">

            <h2>📡 Live Alerts</h2>

            {!leakDetected ? (
              <>
                <div className="alert normal">
                  🟢 System operating normally
                </div>

                <div className="alert normal">
                  🟢 All sensors connected
                </div>
              </>
            ) : (
              <>
                <div className="alert danger">
                  🚨 Water Leak Detected
                </div>

                <div className="alert danger">
                  📍 Location: Pipeline Node 3
                </div>

                <div className="alert warning">
                  ⚠ Administrator Alert Generated
                </div>

                {!ticketCreated ? (
                  <button
                    className="maintenance-btn"
                    onClick={createMaintenanceTicket}
                  >
                    🛠 Create Maintenance Ticket
                  </button>
                ) : (
                  <div className="ticket-success">
                    <strong>✓ Maintenance Ticket Created</strong>

                    <div className="ticket-details">
                      <p>Ticket ID: AQ-2045</p>
                      <p>Priority: HIGH</p>
                      <p>Location: Pipeline Node 3</p>
                      <p>Status: Assigned</p>
                      <p>Team: Water Maintenance</p>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>


          {/* SENSOR STATUS */}
          <div className="panel">

            <h2>🎛 Sensor Status</h2>

            <div className="sensor-row">
              <span>Flow Sensor</span>
              <strong>🟢 Online</strong>
            </div>

            <div className="sensor-row">
              <span>Pressure Sensor</span>
              <strong>🟢 Online</strong>
            </div>

            <div className="sensor-row">
              <span>ESP32</span>
              <strong>🟢 Connected</strong>
            </div>

            <div className="sensor-row">
              <span>AI Engine</span>
              <strong>🟢 Active</strong>
            </div>

          </div>

        </section>


        {/* MAINTENANCE STATUS */}
        {ticketCreated && (
          <section className="panel maintenance-panel">

            <div className="maintenance-header">
              <div>
                <h2>🛠 Maintenance Response</h2>
                <p>Incident response workflow</p>
              </div>

              <span className="status-badge">
                TEAM DISPATCHED
              </span>
            </div>

            <div className="maintenance-steps">

              <div className="maintenance-step completed">
                <span>✓</span>
                <div>
                  <strong>Leak Detected</strong>
                  <small>AI detection completed</small>
                </div>
              </div>

              <div className="maintenance-step completed">
                <span>✓</span>
                <div>
                  <strong>Administrator Alerted</strong>
                  <small>Emergency notification sent</small>
                </div>
              </div>

              <div className="maintenance-step completed">
                <span>✓</span>
                <div>
                  <strong>Ticket Created</strong>
                  <small>AQ-2045 • High Priority</small>
                </div>
              </div>

              <div className="maintenance-step active">
                <span>→</span>
                <div>
                  <strong>Maintenance Team Dispatched</strong>
                  <small>ETA: 12 minutes</small>
                </div>
              </div>

            </div>

          </section>
        )}


        {/* CHARTS */}
        <SensorCharts leakDetected={leakDetected} />

      </main>
    </div>
  );
}