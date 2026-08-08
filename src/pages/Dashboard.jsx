import { useState } from "react";
import SensorCharts from "../components/SensorCharts";

export default function Dashboard({ onNavigate }) {
  const [leakDetected, setLeakDetected] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [valveClosed, setValveClosed] = useState(false);

  const simulateLeak = () => {
    setLeakDetected(true);
    setTicketCreated(false);
    setValveClosed(false);
  };

  const resetSystem = () => {
    setLeakDetected(false);
    setTicketCreated(false);
    setValveClosed(false);
  };

  const createMaintenanceTicket = () => {
    setTicketCreated(true);
  };

  const closeValve = () => {
    setValveClosed(true);
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">

        <div>
          <h1>Water Network Dashboard</h1>

          <p>
            Real-time monitoring & AI leak detection
          </p>
        </div>


        <div className="admin">

          <span className="online-dot"></span>

          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

        </div>

      </header>


      {/* DASHBOARD NAVIGATION */}
      <div className="dashboard-nav">

        <button
          type="button"
          className="active-nav"
          onClick={() => onNavigate("dashboard")}
        >
          🏠 Dashboard
        </button>


        <button
          type="button"
          onClick={() => onNavigate("analytics")}
        >
          📊 Analytics
        </button>


        <button
          type="button"
          onClick={() => onNavigate("reports")}
        >
          📄 Reports
        </button>

      </div>


      {/* SIMULATION */}
      <div className="simulation-bar">

        <div>

          <strong>
            Simulation Control
          </strong>

          <p>
            Test the complete AquaGuard AI response workflow
          </p>

        </div>


        <button
          type="button"
          className="simulate-btn"
          onClick={
            leakDetected
              ? resetSystem
              : simulateLeak
          }
        >
          {leakDetected
            ? "↻ Reset System"
            : "🚨 Simulate Leak"}
        </button>

      </div>


      {/* STATUS CARDS */}
      <section className="stats-grid">

        <div className="stat-card">

          <span>💧 Flow Rate</span>

          <h2>
            {leakDetected
              ? "82 L/min"
              : "120 L/min"}
          </h2>

          <small
            className={
              leakDetected
                ? "danger-text"
                : ""
            }
          >
            {leakDetected
              ? "⚠ Abnormal"
              : "✓ Normal"}
          </small>

        </div>


        <div className="stat-card">

          <span>🔵 Pressure</span>

          <h2>
            {leakDetected
              ? "2.1 Bar"
              : "4.3 Bar"}
          </h2>

          <small
            className={
              leakDetected
                ? "danger-text"
                : ""
            }
          >
            {leakDetected
              ? "⚠ Pressure Drop"
              : "✓ Stable"}
          </small>

        </div>


        <div className="stat-card">

          <span>🤖 Leak Probability</span>

          <h2>
            {leakDetected
              ? "96%"
              : "4%"}
          </h2>

          <small
            className={
              leakDetected
                ? "danger-text"
                : ""
            }
          >
            {leakDetected
              ? "⚠ High Risk"
              : "✓ Low Risk"}
          </small>

        </div>


        <div className="stat-card">

          <span>🔧 Valve Status</span>

          <h2>
            {valveClosed
              ? "CLOSED"
              : "OPEN"}
          </h2>

          <small
            className={
              valveClosed
                ? "success-text"
                : "danger-text"
            }
          >
            {valveClosed
              ? "✓ Section Isolated"
              : "⚠ Water Flow Active"}
          </small>

        </div>

      </section>


      {/* PIPELINE + AI */}
      <section className="dashboard-grid">

        {/* PIPELINE */}
        <div className="panel pipeline-panel">

          <div className="panel-title">

            <div>

              <h2>
                Smart Pipeline Network
              </h2>

              <p>
                Real-time sensor network
              </p>

            </div>

            <span className="network-status">
              🟢 LIVE
            </span>

          </div>


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
              <span>Flow</span>
            </div>

            <div className="pipe"></div>

            <div className="node healthy">
              S2
              <span>Pressure</span>
            </div>

            <div
              className={
                leakDetected && !valveClosed
                  ? "pipe leak-pipe"
                  : "pipe"
              }
            ></div>

            <div
              className={
                leakDetected && !valveClosed
                  ? "node leak"
                  : "node healthy"
              }
            >
              S3

              <span>
                {leakDetected
                  ? "LEAK"
                  : "Acoustic"}
              </span>

            </div>

            <div
              className={
                leakDetected && !valveClosed
                  ? "pipe leak-pipe"
                  : "pipe"
              }
            ></div>

            <div className="node">
              🏠
              <span>House</span>
            </div>

          </div>


          {leakDetected && !valveClosed && (

            <div className="leak-location">

              🚨

              <strong>
                Leak Detected
              </strong>

              <span>
                Location: Pipeline Node 3
              </span>

            </div>

          )}


          {valveClosed && (

            <div className="isolation-message">
              ✓ Node 3 isolated — water flow stopped
            </div>

          )}

        </div>


        {/* AI ANALYSIS */}
        <div className="panel ai-panel">

          <div className="panel-title">

            <div>

              <h2>
                🤖 AI Analysis
              </h2>

              <p>
                Machine learning detection engine
              </p>

            </div>

          </div>


          <div className="ai-status">

            <span>
              System Status
            </span>

            <strong
              className={
                leakDetected && !valveClosed
                  ? "critical"
                  : "healthy-text"
              }
            >
              {!leakDetected
                ? "HEALTHY"
                : valveClosed
                ? "ISOLATED"
                : "CRITICAL"}
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
              98%
            </strong>

          </div>


          <div className="ai-value">

            <span>
              Detected Location
            </span>

            <strong>
              {leakDetected
                ? "Node 3"
                : "None"}
            </strong>

          </div>


          <div className="ai-value">

            <span>
              Recommended Action
            </span>

            <strong>
              {valveClosed
                ? "Repair Pipeline"
                : leakDetected
                ? "Isolate Node 3"
                : "Continue Monitoring"}
            </strong>

          </div>


          <div
            className={
              leakDetected && !valveClosed
                ? "recommendation danger"
                : "recommendation"
            }
          >
            {!leakDetected
              ? "✓ No abnormal activity detected"
              : valveClosed
              ? "✓ Pipeline section safely isolated"
              : "⚠ Immediate isolation recommended"}
          </div>

        </div>

      </section>


      {/* LIVE ALERTS + SENSOR STATUS */}
      <section className="dashboard-grid">

        <div className="panel">

          <div className="panel-title">

            <div>

              <h2>
                📡 Live Alerts
              </h2>

              <p>
                Real-time system notifications
              </p>

            </div>

            {leakDetected && (

              <span className="alert-badge">
                1 NEW
              </span>

            )}

          </div>


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


              {!ticketCreated ? (

                <button
                  type="button"
                  className="maintenance-btn"
                  onClick={createMaintenanceTicket}
                >
                  🛠 Create Maintenance Ticket
                </button>

              ) : (

                <div className="ticket-success">

                  <strong>
                    ✓ Maintenance Ticket Created
                  </strong>

                  <div className="ticket-details">

                    <p>Ticket ID: AQ-2045</p>
                    <p>Priority: HIGH</p>
                    <p>Location: Pipeline Node 3</p>
                    <p>Status: Assigned</p>
                    <p>Team: Water Maintenance</p>

                  </div>

                </div>

              )}


              {ticketCreated && !valveClosed && (

                <button
                  type="button"
                  className="valve-btn"
                  onClick={closeValve}
                >
                  🔒 Close Isolation Valve
                </button>

              )}


              {valveClosed && (

                <div className="ticket-success">

                  ✓ Isolation Valve Closed

                  <br />

                  <small>
                    Pipeline Node 3 isolated successfully.
                  </small>

                </div>

              )}

            </>

          )}

        </div>


        {/* SENSOR STATUS */}
        <div className="panel">

          <div className="panel-title">

            <div>

              <h2>
                🎛 Sensor Status
              </h2>

              <p>
                Connected IoT devices
              </p>

            </div>

          </div>


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

          <div className="sensor-row">

            <span>
              Isolation Valve
            </span>

            <strong>
              {valveClosed
                ? "🔴 Closed"
                : "🟢 Open"}
            </strong>

          </div>

        </div>

      </section>


      {/* MAINTENANCE */}
      {ticketCreated && (

        <section className="panel maintenance-panel">

          <div className="maintenance-header">

            <div>

              <h2>
                🛠 Maintenance Response
              </h2>

              <p>
                Incident response workflow
              </p>

            </div>

            <span
              className={
                valveClosed
                  ? "status-badge success-badge"
                  : "status-badge"
              }
            >
              {valveClosed
                ? "PIPELINE ISOLATED"
                : "TEAM DISPATCHED"}
            </span>

          </div>


          <div className="maintenance-steps">

            <div className="maintenance-step completed">

              <span>✓</span>

              <div>

                <strong>
                  Leak Detected
                </strong>

                <small>
                  AI detection completed
                </small>

              </div>

            </div>


            <div className="maintenance-step completed">

              <span>✓</span>

              <div>

                <strong>
                  Administrator Alerted
                </strong>

                <small>
                  Emergency notification sent
                </small>

              </div>

            </div>


            <div className="maintenance-step completed">

              <span>✓</span>

              <div>

                <strong>
                  Ticket Created
                </strong>

                <small>
                  AQ-2045 • High Priority
                </small>

              </div>

            </div>


            <div
              className={
                valveClosed
                  ? "maintenance-step completed"
                  : "maintenance-step active"
              }
            >

              <span>
                {valveClosed ? "✓" : "→"}
              </span>

              <div>

                <strong>
                  {valveClosed
                    ? "Pipeline Isolated"
                    : "Maintenance Team Dispatched"}
                </strong>

                <small>
                  {valveClosed
                    ? "Node 3 safely isolated"
                    : "ETA: 12 minutes"}
                </small>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* CHARTS */}
      <SensorCharts
        leakDetected={leakDetected}
      />

    </div>
  );
}