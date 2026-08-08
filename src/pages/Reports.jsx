import React, { useMemo, useState } from "react";
import { useAquaGuard } from "../context/AquaGuardContext";

function Reports() {
  const { incidents } = useAquaGuard();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Filter incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        incident.id.toLowerCase().includes(searchText) ||
        incident.location.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        incident.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [incidents, search, statusFilter]);

  // Statistics
  const totalIncidents = incidents.length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const averageProbability =
    incidents.length > 0
      ? Math.round(
          incidents.reduce(
            (total, incident) =>
              total + incident.probability,
            0
          ) / incidents.length
        )
      : 0;

  const averageResponse =
    incidents.length > 0
      ? Math.round(
          incidents.reduce(
            (total, incident) =>
              total + parseInt(incident.response),
            0
          ) / incidents.length
        )
      : 0;

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Incident ID",
      "Date",
      "Time",
      "Location",
      "Probability",
      "Response",
      "Status",
    ];

    const rows = incidents.map((incident) => [
      incident.id,
      incident.date,
      incident.time,
      incident.location,
      `${incident.probability}%`,
      incident.response,
      incident.status,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "aquaguard-incident-reports.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Print
  const printReports = () => {
    window.print();
  };

  return (
    <div className="reports-page">

      {/* HEADER */}
      <div className="reports-header">
        <div>
          <span className="page-label">
            AQUAGUARD AI / REPORTS
          </span>

          <h1>Incident Reports</h1>

          <p>
            Leak detection history and maintenance records
          </p>
        </div>

        <div className="report-actions">
          <button
            className="secondary-report-btn"
            onClick={printReports}
          >
            🖨️ Print
          </button>

          <button
            className="export-btn"
            onClick={exportCSV}
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="reports-stats">

        <div className="report-stat">
          <span>🚨 Total Incidents</span>

          <strong>
            {totalIncidents}
          </strong>

          <small>
            Recorded incidents
          </small>
        </div>

        <div className="report-stat">
          <span>✓ Resolved</span>

          <strong className="green-text">
            {resolvedIncidents}
          </strong>

          <small>
            Successful resolution
          </small>
        </div>

        <div className="report-stat">
          <span>🤖 Avg AI Probability</span>

          <strong>
            {averageProbability}%
          </strong>

          <small>
            Detection confidence
          </small>
        </div>

        <div className="report-stat">
          <span>◷ Avg Response</span>

          <strong>
            {averageResponse} min
          </strong>

          <small>
            Emergency response
          </small>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="report-filter-bar">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search incident ID or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          className="report-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Resolved</option>
        </select>

      </div>

      {/* REPORT TABLE */}
      <div className="panel reports-panel">

        <div className="reports-panel-header">

          <div>
            <h2>📋 Detection History</h2>

            <p>
              Showing {filteredIncidents.length} of{" "}
              {incidents.length} incidents
            </p>
          </div>

          <span className="records-badge">
            LIVE DATA
          </span>

        </div>

        <div className="reports-table">

          {/* TABLE HEADER */}
          <div className="report-row report-table-header">

            <span>ID</span>

            <span>DATE & TIME</span>

            <span>LOCATION</span>

            <span>PROBABILITY</span>

            <span>RESPONSE</span>

            <span>STATUS</span>

            <span>ACTION</span>

          </div>

          {/* TABLE DATA */}
          {filteredIncidents.map((incident) => (

            <div
              className="report-row"
              key={incident.id}
            >

              <span className="report-id">
                {incident.id}
              </span>

              <span>
                {incident.date}

                <small className="table-time">
                  {incident.time}
                </small>
              </span>

              <span>
                📍 {incident.location}
              </span>

              <span
                className={
                  incident.probability >= 90
                    ? "probability high"
                    : "probability"
                }
              >
                {incident.probability}%
              </span>

              <span>
                {incident.response}
              </span>

              <span
                className={
                  incident.status === "Resolved"
                    ? "status-resolved"
                    : "critical"
                }
              >
                ● {incident.status}
              </span>

              <span>
                <button
                  className="view-btn"
                  onClick={() =>
                    setSelectedIncident(incident)
                  }
                >
                  View
                </button>
              </span>

            </div>

          ))}

          {/* EMPTY STATE */}
          {filteredIncidents.length === 0 && (

            <div className="no-alerts">

              <div>📋</div>

              <h2>
                No incidents found
              </h2>

              <p>
                Try changing your search or status filter.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* INCIDENT DETAILS MODAL */}
      {selectedIncident && (

        <div
          className="report-overlay"
          onClick={() =>
            setSelectedIncident(null)
          }
        >

          <div
            className="report-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <span className="modal-label">
                  INCIDENT DETAILS
                </span>

                <h2>
                  {selectedIncident.id}
                </h2>

                <p>
                  {selectedIncident.location}
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedIncident(null)
                }
              >
                ✕
              </button>

            </div>

            {/* STATUS */}
            <div className="incident-status-box">

              <div>
                <span>Status</span>

                <strong
                  className={
                    selectedIncident.status ===
                    "Resolved"
                      ? "green-text"
                      : "red-value"
                  }
                >
                  ● {selectedIncident.status}
                </strong>
              </div>

              <div>
                <span>AI Probability</span>

                <strong className="red-value">
                  {selectedIncident.probability}%
                </strong>
              </div>

            </div>

            {/* DETAILS */}
            <div className="report-details">

              <div className="detail-item">
                <span>Date</span>

                <strong>
                  {selectedIncident.date}
                </strong>
              </div>

              <div className="detail-item">
                <span>Time</span>

                <strong>
                  {selectedIncident.time}
                </strong>
              </div>

              <div className="detail-item">
                <span>Location</span>

                <strong>
                  {selectedIncident.location}
                </strong>
              </div>

              <div className="detail-item">
                <span>Response Time</span>

                <strong>
                  {selectedIncident.response}
                </strong>
              </div>

            </div>

            {/* TIMELINE */}
            <div className="report-timeline">

              <h3>
                Response Timeline
              </h3>

              <div className="timeline-item">

                <span>✓</span>

                <div>
                  <strong>
                    Sensor anomaly detected
                  </strong>

                  <small>
                    AI monitoring system identified
                    abnormal activity.
                  </small>
                </div>

              </div>

              <div className="timeline-item">

                <span>✓</span>

                <div>
                  <strong>
                    AI analysis completed
                  </strong>

                  <small>
                    Leak probability calculated at{" "}
                    {selectedIncident.probability}%.
                  </small>
                </div>

              </div>

              <div className="timeline-item">

                <span>✓</span>

                <div>
                  <strong>
                    Response initiated
                  </strong>

                  <small>
                    Response time:{" "}
                    {selectedIncident.response}
                  </small>
                </div>

              </div>

              {selectedIncident.status ===
                "Resolved" && (

                <div className="timeline-item">

                  <span>✓</span>

                  <div>
                    <strong>
                      Incident resolved
                    </strong>

                    <small>
                      Water network returned to
                      normal operation.
                    </small>
                  </div>

                </div>

              )}

            </div>

            <button
              className="close-report-btn"
              onClick={() =>
                setSelectedIncident(null)
              }
            >
              Close Report
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Reports;