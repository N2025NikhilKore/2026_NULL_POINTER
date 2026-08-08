import React, { useMemo } from "react";
import { useAquaGuard } from "../context/AquaGuardContext";

function Analytics() {
  const { incidents, sensorData, leakDetected } = useAquaGuard();

  // -----------------------------
  // BASIC ANALYTICS
  // -----------------------------

  const totalIncidents = incidents.length;

  const activeIncidents = incidents.filter(
    (incident) => incident.status === "Active"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const averageProbability =
    incidents.length > 0
      ? Math.round(
          incidents.reduce(
            (sum, incident) =>
              sum + incident.probability,
            0
          ) / incidents.length
        )
      : 0;

  const averageResponse =
    incidents.length > 0
      ? (
          incidents.reduce(
            (sum, incident) =>
              sum + parseInt(incident.response),
            0
          ) / incidents.length
        ).toFixed(1)
      : "0.0";


  // -----------------------------
  // HIGH RISK INCIDENTS
  // -----------------------------

  const highRiskIncidents = incidents.filter(
    (incident) => incident.probability >= 90
  ).length;


  // -----------------------------
  // WATER SAVED ESTIMATION
  // -----------------------------

  const waterSaved = resolvedIncidents * 1250;


  // -----------------------------
  // RESPONSE PERFORMANCE
  // -----------------------------

  const responseScore = Math.max(
    60,
    Math.min(
      99,
      100 - Math.round(
        Number(averageResponse) * 2
      )
    )
  );


  // -----------------------------
  // LOCATION ANALYSIS
  // -----------------------------

  const locationStats = useMemo(() => {
    const map = {};

    incidents.forEach((incident) => {
      if (!map[incident.location]) {
        map[incident.location] = 0;
      }

      map[incident.location]++;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [incidents]);


  // -----------------------------
  // SYSTEM HEALTH
  // -----------------------------

  const systemHealth = leakDetected
    ? 72
    : 96;


  return (
    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">

        <div>

          <span className="page-label">
            AQUAGUARD AI / ANALYTICS
          </span>

          <h1>
            Network Analytics
          </h1>

          <p>
            AI-powered water network performance insights
          </p>

        </div>


        <div className="analytics-period">
          📅 Live Data
        </div>

      </div>


      {/* STATISTICS */}

      <div className="analytics-stats">

        <div className="analytics-card">

          <span>
            🚨 Total Incidents
          </span>

          <h2>
            {totalIncidents}
          </h2>

          <small>
            {activeIncidents > 0
              ? `${activeIncidents} currently active`
              : "No active incidents"}
          </small>

        </div>


        <div className="analytics-card">

          <span>
            💧 Water Saved
          </span>

          <h2>
            {waterSaved.toLocaleString()} L
          </h2>

          <small className="positive">
            ✓ From leak prevention
          </small>

        </div>


        <div className="analytics-card">

          <span>
            ⚡ Avg Response Time
          </span>

          <h2>
            {averageResponse} min
          </h2>

          <small className="positive">
            ✓ AI-assisted response
          </small>

        </div>


        <div className="analytics-card">

          <span>
            🤖 AI Detection Accuracy
          </span>

          <h2>
            98%
          </h2>

          <small className="positive">
            ✓ High confidence
          </small>

        </div>

      </div>


      {/* MAIN ANALYTICS GRID */}

      <div className="analytics-grid">

        {/* SENSOR PERFORMANCE */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>
                📡 Live Sensor Performance
              </h2>

              <p>
                Current readings from connected sensors
              </p>

            </div>

            <strong className="metric-green">
              {leakDetected
                ? "ABNORMAL"
                : "NORMAL"}
            </strong>

          </div>


          {/* FLOW */}

          <div className="health-item">

            <div>

              <span>
                Flow Rate
              </span>

              <strong>
                {sensorData.flowRate} L/min
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill blue"
                style={{
                  width: `${Math.min(
                    100,
                    (sensorData.flowRate / 150) * 100
                  )}%`,
                }}
              ></div>

            </div>

          </div>


          {/* PRESSURE */}

          <div className="health-item">

            <div>

              <span>
                Pressure
              </span>

              <strong>
                {sensorData.pressure} Bar
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill cyan"
                style={{
                  width: `${Math.min(
                    100,
                    (sensorData.pressure / 5) * 100
                  )}%`,
                }}
              ></div>

            </div>

          </div>


          {/* LEAK PROBABILITY */}

          <div className="health-item">

            <div>

              <span>
                Leak Probability
              </span>

              <strong
                className={
                  sensorData.leakProbability >= 80
                    ? "red-value"
                    : "metric-green"
                }
              >
                {sensorData.leakProbability}%
              </strong>

            </div>

            <div className="progress">

              <div
                className={
                  sensorData.leakProbability >= 80
                    ? "progress-fill"
                    : "progress-fill green"
                }
                style={{
                  width: `${sensorData.leakProbability}%`,
                  background:
                    sensorData.leakProbability >= 80
                      ? "#ff4141"
                      : undefined,
                }}
              ></div>

            </div>

          </div>


          {/* AI CONFIDENCE */}

          <div className="health-item">

            <div>

              <span>
                AI Confidence
              </span>

              <strong className="metric-green">
                {sensorData.aiConfidence}%
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill green"
                style={{
                  width: `${sensorData.aiConfidence}%`,
                }}
              ></div>

            </div>

          </div>

        </div>


        {/* SYSTEM HEALTH */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>
                ❤️ System Health
              </h2>

              <p>
                Overall network condition
              </p>

            </div>

            <strong
              className={
                leakDetected
                  ? "red-value"
                  : "metric-green"
              }
            >
              {systemHealth}%
            </strong>

          </div>


          <div className="health-item">

            <div>

              <span>
                Pipeline Health
              </span>

              <strong>
                {leakDetected
                  ? "72%"
                  : "98%"}
              </strong>

            </div>

            <div className="progress">

              <div
                className={
                  leakDetected
                    ? "progress-fill"
                    : "progress-fill green"
                }
                style={{
                  width: leakDetected
                    ? "72%"
                    : "98%",
                  background: leakDetected
                    ? "#ff4141"
                    : undefined,
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                Sensor Connectivity
              </span>

              <strong className="metric-green">
                100%
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill green"
                style={{
                  width: "100%",
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                AI Engine
              </span>

              <strong className="metric-green">
                98%
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill purple"
                style={{
                  width: "98%",
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                Network Availability
              </span>

              <strong className="metric-green">
                99.9%
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill cyan"
                style={{
                  width: "99.9%",
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>


      {/* INCIDENT ANALYTICS */}

      <div className="analytics-grid">

        {/* INCIDENT SUMMARY */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>
                📊 Incident Summary
              </h2>

              <p>
                Current detection statistics
              </p>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                Resolved Incidents
              </span>

              <strong className="metric-green">
                {resolvedIncidents}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill green"
                style={{
                  width:
                    totalIncidents > 0
                      ? `${(resolvedIncidents / totalIncidents) * 100}%`
                      : "0%",
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                Active Incidents
              </span>

              <strong className="red-value">
                {activeIncidents}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width:
                    totalIncidents > 0
                      ? `${(activeIncidents / totalIncidents) * 100}%`
                      : "0%",
                  background: "#ff4141",
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                High Risk Incidents
              </span>

              <strong>
                {highRiskIncidents}
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width:
                    totalIncidents > 0
                      ? `${(highRiskIncidents / totalIncidents) * 100}%`
                      : "0%",
                  background: "#f59e0b",
                }}
              ></div>

            </div>

          </div>


          <div className="health-item">

            <div>

              <span>
                Response Performance
              </span>

              <strong className="metric-green">
                {responseScore}%
              </strong>

            </div>

            <div className="progress">

              <div
                className="progress-fill green"
                style={{
                  width: `${responseScore}%`,
                }}
              ></div>

            </div>

          </div>

        </div>


        {/* FREQUENT LOCATIONS */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>
                📍 Incident Locations
              </h2>

              <p>
                Areas with recorded incidents
              </p>

            </div>

          </div>


          {locationStats.length > 0 ? (

            locationStats.map(
              ([location, count], index) => (

                <div
                  className="health-item"
                  key={location}
                >

                  <div>

                    <span>
                      {index + 1}. {location}
                    </span>

                    <strong>
                      {count} incident
                      {count !== 1 ? "s" : ""}
                    </strong>

                  </div>

                  <div className="progress">

                    <div
                      className="progress-fill blue"
                      style={{
                        width: `${Math.min(
                          100,
                          count * 25
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="no-alerts">

              <div>📊</div>

              <h2>
                No Incident Data
              </h2>

              <p>
                Incident analytics will appear here.
              </p>

            </div>

          )}

        </div>

      </div>


      {/* RECENT INCIDENTS */}

      <div className="analytics-panel">

        <div className="analytics-panel-header">

          <div>

            <h2>
              🕒 Recent Incidents
            </h2>

            <p>
              Latest AquaGuard AI detections
            </p>

          </div>

          <strong className="metric-blue">
            LIVE
          </strong>

        </div>


        {incidents.slice(0, 5).map(
          (incident) => (

            <div
              className="sensor-row"
              key={incident.id}
            >

              <span>
                <strong>
                  {incident.id}
                </strong>
                {" — "}
                {incident.location}
              </span>

              <strong
                className={
                  incident.status === "Active"
                    ? "red-value"
                    : "metric-green"
                }
              >
                {incident.status}
              </strong>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Analytics;