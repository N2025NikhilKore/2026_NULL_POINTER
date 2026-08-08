import { useState } from "react";

const initialAlerts = [
  {
    id: "ALT-001",
    title: "Water Leak Detected",
    location: "Pipeline Node 3",
    probability: 96,
    priority: "HIGH",
    time: "2 minutes ago",
    status: "Active",
    type: "leak",
  },
  {
    id: "ALT-002",
    title: "Pressure Drop Detected",
    location: "Pipeline Node 7",
    probability: 91,
    priority: "HIGH",
    time: "18 minutes ago",
    status: "Resolved",
    type: "pressure",
  },
  {
    id: "ALT-003",
    title: "Abnormal Flow Pattern",
    location: "Pipeline Node 5",
    probability: 84,
    priority: "MEDIUM",
    time: "42 minutes ago",
    status: "Resolved",
    type: "flow",
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter(
          (alert) => alert.status === filter
        );

  const resolveAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Resolved",
            }
          : alert
      )
    );

    setSelectedAlert(null);
  };

  const activeCount = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  return (
    <div className="alerts-page">

      {/* HEADER */}

      <div className="alerts-header">

        <div>

          <div className="page-label">
            AQUAGUARD AI / ALERTS
          </div>

          <h1>Alert Center</h1>

          <p>
            Monitor and manage water network alerts
          </p>

        </div>

        <div className="active-alert-counter">

          <span className="alert-counter-dot"></span>

          {activeCount} Active Alerts

        </div>

      </div>


      {/* SUMMARY */}

      <section className="alert-stats">

        <div className="alert-stat-card">

          <span>🚨 Active Alerts</span>

          <strong className="red-value">
            {activeCount}
          </strong>

          <small>
            Require attention
          </small>

        </div>


        <div className="alert-stat-card">

          <span>⚠ High Priority</span>

          <strong>
            {
              alerts.filter(
                (alert) =>
                  alert.priority === "HIGH"
              ).length
            }
          </strong>

          <small>
            Critical incidents
          </small>

        </div>


        <div className="alert-stat-card">

          <span>✓ Resolved Today</span>

          <strong className="green-text">
            {
              alerts.filter(
                (alert) =>
                  alert.status === "Resolved"
              ).length
            }
          </strong>

          <small>
            Successfully handled
          </small>

        </div>


        <div className="alert-stat-card">

          <span>🤖 AI Confidence</span>

          <strong>
            98%
          </strong>

          <small>
            Detection confidence
          </small>

        </div>

      </section>


      {/* FILTER */}

      <div className="alerts-filter">

        <button
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

      <section className="alerts-list">

        {filteredAlerts.map((alert) => (

          <div
            className={
              alert.status === "Active"
                ? "alert-card active-alert"
                : "alert-card"
            }
            key={alert.id}
          >

            <div className="alert-card-icon">

              {alert.type === "leak"
                ? "💧"
                : alert.type === "pressure"
                ? "🔵"
                : "📈"}

            </div>


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


              <div className="alert-card-actions">

                <button
                  className="view-alert-btn"
                  onClick={() =>
                    setSelectedAlert(alert)
                  }
                >
                  View Details
                </button>


                {alert.status === "Active" && (

                  <button
                    className="resolve-alert-btn"
                    onClick={() =>
                      resolveAlert(alert.id)
                    }
                  >
                    ✓ Resolve Alert
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </section>


      {/* EMPTY */}

      {filteredAlerts.length === 0 && (

        <div className="no-alerts">

          <div>✓</div>

          <h2>
            No alerts found
          </h2>

          <p>
            There are no alerts matching this filter.
          </p>

        </div>

      )}


      {/* MODAL */}

      {selectedAlert && (

        <div className="report-overlay">

          <div className="report-modal">

            <div className="modal-header">

              <div>

                <div className="modal-label">
                  ALERT DETAILS
                </div>

                <h2>
                  {selectedAlert.title}
                </h2>

                <p>
                  {selectedAlert.id}
                </p>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedAlert(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="incident-status-box">

              <div>

                <span>
                  Status
                </span>

                <strong
                  className={
                    selectedAlert.status === "Active"
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


            {selectedAlert.status === "Active" && (

              <button
                className="resolve-alert-btn modal-resolve"
                onClick={() =>
                  resolveAlert(selectedAlert.id)
                }
              >
                ✓ Resolve Alert
              </button>

            )}

          </div>

        </div>

      )}

    </div>
  );
}