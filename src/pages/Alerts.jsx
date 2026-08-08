import React, { useState } from "react";
import { useAquaGuard } from "../context/AquaGuardContext";

function Alerts() {
  const {
    incidents,
    leakDetected,
    resolveIncident,
  } = useAquaGuard();

  const [filter, setFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Convert incidents into alerts
  const alerts = incidents.map((incident) => ({
    ...incident,
    title:
      incident.probability >= 90
        ? "Water Leak Detected"
        : "Abnormal Water Pattern",
    priority:
      incident.probability >= 90
        ? "HIGH"
        : "MEDIUM",
  }));

  // Filter alerts
  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter(
          (alert) => alert.status === filter
        );

  // Statistics
  const activeAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  const highPriorityAlerts = alerts.filter(
    (alert) => alert.priority === "HIGH"
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert) => alert.status === "Resolved"
  ).length;

  // Resolve
  const handleResolve = (alertId) => {
    resolveIncident(alertId);
    setSelectedAlert(null);
  };

  return (
    <div className="alerts-page">

      {/* HEADER */}

      <div className="alerts-header">

        <div>

          <span className="page-label">
            AQUAGUARD AI / ALERTS
          </span>

          <h1>
            Alert Center
          </h1>

          <p>
            Monitor and manage water network alerts
          </p>

        </div>


        <div className="active-alert-counter">

          <span className="alert-counter-dot"></span>

          {activeAlerts} Active Alerts

        </div>

      </div>


      {/* STATISTICS */}

      <div className="alert-stats">

        <div className="alert-stat-card">

          <span>
            🚨 Active Alerts
          </span>

          <strong className="red-value">
            {activeAlerts}
          </strong>

          <small>
            Require attention
          </small>

        </div>


        <div className="alert-stat-card">

          <span>
            ⚠ High Priority
          </span>

          <strong className="red-value">
            {highPriorityAlerts}
          </strong>

          <small>
            Critical incidents
          </small>

        </div>


        <div className="alert-stat-card">

          <span>
            ✓ Resolved Today
          </span>

          <strong className="green-text">
            {resolvedAlerts}
          </strong>

          <small>
            Successfully handled
          </small>

        </div>


        <div className="alert-stat-card">

          <span>
            🤖 AI Confidence
          </span>

          <strong>
            98%
          </strong>

          <small>
            Detection confidence
          </small>

        </div>

      </div>


      {/* FILTER */}

      <div className="alerts-filter">

        <button
          type="button"
          className={
            filter === "All"
              ? "alert-filter active"
              : "alert-filter"
          }
          onClick={() => setFilter("All")}
        >
          All Alerts
        </button>


        <button
          type="button"
          className={
            filter === "Active"
              ? "alert-filter active"
              : "alert-filter"
          }
          onClick={() => setFilter("Active")}
        >
          Active
        </button>


        <button
          type="button"
          className={
            filter === "Resolved"
              ? "alert-filter active"
              : "alert-filter"
          }
          onClick={() => setFilter("Resolved")}
        >
          Resolved
        </button>

      </div>


      {/* ALERT LIST */}

      <div className="alerts-list">

        {filteredAlerts.map((alert) => (

          <div
            className={
              alert.status === "Active"
                ? "alert-card active-alert"
                : "alert-card"
            }
            key={alert.id}
          >

            {/* ICON */}

            <div className="alert-card-icon">

              {alert.status === "Active"
                ? "🚨"
                : "✓"}

            </div>


            {/* CONTENT */}

            <div className="alert-card-content">

              <div className="alert-card-top">

                <div>

                  <span className="alert-id">
                    {alert.id}
                  </span>

                  <h2>
                    {alert.title}
                  </h2>

                </div>


                <span
                  className={
                    alert.status === "Active"
                      ? "active-status"
                      : "resolved-status"
                  }
                >
                  ● {alert.status}
                </span>

              </div>


              {/* INFO */}

              <div className="alert-card-info">

                <span>
                  📍 {alert.location}
                </span>

                <span>
                  🤖 {alert.probability}% AI Probability
                </span>

                <span>
                  ⏱ {alert.time}
                </span>

                <span
                  className={
                    alert.priority === "HIGH"
                      ? "priority-high"
                      : "priority-medium"
                  }
                >
                  {alert.priority}
                </span>

              </div>


              {/* ACTIONS */}

              <div className="alert-card-actions">

                <button
                  type="button"
                  className="view-alert-btn"
                  onClick={() =>
                    setSelectedAlert(alert)
                  }
                >
                  View Details
                </button>


                {alert.status === "Active" && (

                  <button
                    type="button"
                    className="resolve-alert-btn"
                    onClick={() =>
                      handleResolve(alert.id)
                    }
                  >
                    ✓ Resolve Alert
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* EMPTY STATE */}

      {filteredAlerts.length === 0 && (

        <div className="no-alerts">

          <div>✓</div>

          <h2>
            No Active Alerts
          </h2>

          <p>
            The AquaGuard AI system has no alerts
            requiring attention.
          </p>

        </div>

      )}


      {/* DETAILS MODAL */}

      {selectedAlert && (

        <div
          className="report-overlay"
          onClick={() =>
            setSelectedAlert(null)
          }
        >

          <div
            className="report-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <span className="modal-label">
                  ALERT DETAILS
                </span>

                <h2>
                  {selectedAlert.title}
                </h2>

                <p>
                  {selectedAlert.id}
                </p>

              </div>


              <button
                type="button"
                className="close-modal"
                onClick={() =>
                  setSelectedAlert(null)
                }
              >
                ✕
              </button>

            </div>


            {/* STATUS */}

            <div className="incident-status-box">

              <div>

                <span>
                  Status
                </span>

                <strong
                  className={
                    selectedAlert.status ===
                    "Active"
                      ? "red-value"
                      : "green-text"
                  }
                >
                  ● {selectedAlert.status}
                </strong>

              </div>


              <div>

                <span>
                  AI Probability
                </span>

                <strong className="red-value">
                  {selectedAlert.probability}%
                </strong>

              </div>

            </div>


            {/* DETAILS */}

            <div className="report-details">

              <div className="detail-item">

                <span>
                  Alert ID
                </span>

                <strong>
                  {selectedAlert.id}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Location
                </span>

                <strong>
                  {selectedAlert.location}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Priority
                </span>

                <strong>
                  {selectedAlert.priority}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Detected
                </span>

                <strong>
                  {selectedAlert.time}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  AI Confidence
                </span>

                <strong>
                  98%
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Recommended Action
                </span>

                <strong>
                  Isolate affected section
                </strong>

              </div>

            </div>


            {/* RESPONSE */}

            <div className="report-timeline">

              <h3>
                Alert Response
              </h3>


              <div className="timeline-item">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Sensor anomaly detected
                  </strong>

                  <small>
                    Abnormal flow and pressure
                    pattern identified.
                  </small>

                </div>

              </div>


              <div className="timeline-item">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    AI analysis completed
                  </strong>

                  <small>
                    Detection confidence: 98%.
                  </small>

                </div>

              </div>


              <div className="timeline-item">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Location identified
                  </strong>

                  <small>
                    {selectedAlert.location}
                  </small>

                </div>

              </div>


              {selectedAlert.status ===
                "Resolved" && (

                <div className="timeline-item">

                  <span>
                    ✓
                  </span>

                  <div>

                    <strong>
                      Alert resolved
                    </strong>

                    <small>
                      Incident successfully handled.
                    </small>

                  </div>

                </div>

              )}

            </div>


            {/* RESOLVE */}

            {selectedAlert.status === "Active" && (

              <button
                type="button"
                className="resolve-alert-btn modal-resolve"
                onClick={() =>
                  handleResolve(
                    selectedAlert.id
                  )
                }
              >
                ✓ Resolve Alert
              </button>

            )}


            <button
              type="button"
              className="close-report-btn"
              onClick={() =>
                setSelectedAlert(null)
              }
            >
              Close

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Alerts;