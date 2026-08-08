import React from "react";
import { useAquaGuard } from "../context/AquaGuardContext";
import SensorCharts from "../components/SensorCharts";
import NetworkMap from "../components/NetworkMap";

function Dashboard() {
  const {
    leakDetected,
    ticketCreated,
    valveClosed,
    sensorData,
    simulateLeak,
    closeValve,
    resetSystem,
  } = useAquaGuard();

  return (
    <div className="dashboard">

      {/* =========================
          HEADER
      ========================== */}

      <div className="dashboard-header">

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

      </div>


      {/* =========================
          DASHBOARD NAVIGATION
      ========================== */}

      <div className="dashboard-nav">

        <button
          type="button"
          className="active-nav"
        >
          🏠 Dashboard
        </button>

        <button type="button">
          📊 Analytics
        </button>

        <button type="button">
          📄 Reports
        </button>

      </div>


      {/* =========================
          SIMULATION CONTROL
      ========================== */}

      <div className="simulation-bar">

        <div>

          <strong>
            Simulation Control
          </strong>

          <p>
            Test the complete AquaGuard AI response workflow
          </p>

        </div>

        {!leakDetected ? (

          <button
            type="button"
            className="simulate-btn"
            onClick={simulateLeak}
          >
            🚨 Simulate Leak
          </button>

        ) : (

          <button
            type="button"
            className="simulate-btn"
            onClick={resetSystem}
          >
            🔄 Reset System
          </button>

        )}

      </div>


      {/* =========================
          SENSOR STATISTICS
      ========================== */}

      <div className="stats-grid">

        {/* FLOW */}

        <div className="stat-card">

          <span>
            💧 Flow Rate
          </span>

          <h2>
            {sensorData.flowRate} L/min
          </h2>

          <small
            className={
              leakDetected
                ? "danger-text"
                : "success-text"
            }
          >
            {leakDetected
              ? "⚠ Abnormal Flow"
              : "✓ Normal"}
          </small>

        </div>


        {/* PRESSURE */}

        <div className="stat-card">

          <span>
            🔵 Pressure
          </span>

          <h2>
            {sensorData.pressure} Bar
          </h2>

          <small
            className={
              leakDetected
                ? "danger-text"
                : "success-text"
            }
          >
            {leakDetected
              ? "⚠ Pressure Drop"
              : "✓ Stable"}
          </small>

        </div>


        {/* LEAK PROBABILITY */}

        <div className="stat-card">

          <span>
            🤖 Leak Probability
          </span>

          <h2>
            {sensorData.leakProbability}%
          </h2>

          <small
            className={
              sensorData.leakProbability >= 80
                ? "danger-text"
                : "success-text"
            }
          >
            {sensorData.leakProbability >= 80
              ? "⚠ High Risk"
              : "✓ Low Risk"}
          </small>

        </div>


        {/* VALVE */}

        <div className="stat-card">

          <span>
            🔧 Valve Status
          </span>

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
              ? "✓ Water Flow Isolated"
              : "⚠ Water Flow Active"}
          </small>

        </div>

      </div>


      {/* =========================
          PIPELINE + AI ANALYSIS
      ========================== */}

      <div className="dashboard-grid">

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

            <div className="network-status">
              🟢 LIVE
            </div>

          </div>


          <div className="pipeline">

            <div className="node">

              🏭

              <span>
                Tank
              </span>

            </div>


            <div className="pipe"></div>


            <div className="node">

              ⚙️

              <span>
                Pump
              </span>

            </div>


            <div className="pipe"></div>


            <div
              className={
                leakDetected
                  ? "node leak"
                  : "node healthy"
              }
            >

              S1

              <span>
                Flow
              </span>

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

              S2

              <span>
                Pressure
              </span>

            </div>


            <div className="pipe"></div>


            <div className="node healthy">

              S3

              <span>
                Acoustic
              </span>

            </div>


            <div className="pipe"></div>


            <div className="node">

              🏠

              <span>
                House
              </span>

            </div>

          </div>


          {leakDetected && (

            <div className="leak-location">

              🚨

              <span>

                Leak detected at{" "}

                <strong>
                  Pipeline Node 3
                </strong>

              </span>

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
                leakDetected
                  ? "critical"
                  : "healthy-text"
              }
            >
              {leakDetected
                ? "ALERT"
                : "HEALTHY"}
            </strong>

          </div>


          <div className="ai-value">

            <span>
              Leak Probability
            </span>

            <strong>
              {sensorData.leakProbability}%
            </strong>

          </div>


          <div className="ai-value">

            <span>
              AI Confidence
            </span>

            <strong>
              {sensorData.aiConfidence}%
            </strong>

          </div>


          <div className="ai-value">

            <span>
              Detected Location
            </span>

            <strong>
              {leakDetected
                ? "Pipeline Node 3"
                : "None"}
            </strong>

          </div>


          <div className="ai-value">

            <span>
              Recommended Action
            </span>

            <strong>
              {leakDetected
                ? "Isolate Pipeline"
                : "Continue Monitoring"}
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
              ? "⚠ Abnormal activity detected. Immediate pipeline isolation recommended."
              : "✓ No abnormal activity detected"}

          </div>

        </div>

      </div>


      {/* =========================
          LEAK RESPONSE WORKFLOW
      ========================== */}

      {leakDetected && (

        <div className="panel maintenance-panel">

          <div className="maintenance-header">

            <div>

              <h2>
                🚨 Leak Response Workflow
              </h2>

              <p>
                AquaGuard AI automated response system
              </p>

            </div>

            <div
              className={
                valveClosed
                  ? "status-badge success-badge"
                  : "status-badge"
              }
            >

              {valveClosed
                ? "PIPELINE ISOLATED"
                : "ACTION REQUIRED"}

            </div>

          </div>


          <div className="maintenance-steps">

            {/* STEP 1 */}

            <div className="maintenance-step completed">

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Leak Detected
                </strong>

                <small>
                  AI detected abnormal sensor pattern
                </small>

              </div>

            </div>


            {/* STEP 2 */}

            <div className="maintenance-step completed">

              <span>
                ✓
              </span>

              <div>

                <strong>
                  AI Analysis
                </strong>

                <small>
                  {sensorData.aiConfidence}% confidence
                </small>

              </div>

            </div>


            {/* STEP 3 */}

            <div
              className={
                ticketCreated
                  ? "maintenance-step completed"
                  : "maintenance-step"
              }
            >

              <span>
                {ticketCreated ? "✓" : "3"}
              </span>

              <div>

                <strong>
                  Maintenance Ticket
                </strong>

                <small>

                  {ticketCreated
                    ? "Ticket AQ-MT-2046 created"
                    : "Waiting for action"}

                </small>

              </div>

            </div>


            {/* STEP 4 */}

            <div
              className={
                valveClosed
                  ? "maintenance-step completed"
                  : "maintenance-step"
              }
            >

              <span>
                {valveClosed
                  ? "✓"
                  : "4"}
              </span>

              <div>

                <strong>
                  Valve Isolation
                </strong>

                <small>

                  {valveClosed
                    ? "Valve successfully closed"
                    : "Pipeline still active"}

                </small>

              </div>

            </div>

          </div>


          {/* CLOSE VALVE */}

          {!valveClosed && (

            <button
              type="button"
              className="valve-btn"
              onClick={closeValve}
            >
              🔧 Close Valve & Isolate Pipeline
            </button>

          )}


          {/* SUCCESS */}

          {valveClosed && (

            <div className="ticket-success">

              ✓ Pipeline successfully isolated.

              <br />

              Water flow stopped and maintenance
              team notified.

            </div>

          )}

        </div>

      )}


      {/* =========================
          SENSOR CHARTS
      ========================== */}

      <SensorCharts />


      {/* =========================
          LOCATION MAP
      ========================== */}

      <NetworkMap />

    </div>
  );
}

export default Dashboard;