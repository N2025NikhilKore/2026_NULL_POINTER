import { useMemo, useState } from "react";

const reportsData = [
  {
    id: "AQ-2045",
    date: "08 Aug 2026",
    time: "10:10 AM",
    location: "Pipeline Node 3",
    probability: 96,
    response: "4 min",
    status: "Resolved",
    flow: "82 L/min",
    pressure: "2.1 Bar",
    confidence: "98%",
    action: "Valve closed and section isolated",
  },
  {
    id: "AQ-2044",
    date: "07 Aug 2026",
    time: "02:35 PM",
    location: "Pipeline Node 7",
    probability: 91,
    response: "6 min",
    status: "Resolved",
    flow: "86 L/min",
    pressure: "2.5 Bar",
    confidence: "95%",
    action: "Maintenance completed",
  },
  {
    id: "AQ-2043",
    date: "06 Aug 2026",
    time: "11:20 AM",
    location: "Pipeline Node 2",
    probability: 87,
    response: "5 min",
    status: "Resolved",
    flow: "89 L/min",
    pressure: "2.8 Bar",
    confidence: "93%",
    action: "Pipeline repaired",
  },
  {
    id: "AQ-2042",
    date: "05 Aug 2026",
    time: "04:45 PM",
    location: "Pipeline Node 5",
    probability: 94,
    response: "3 min",
    status: "Resolved",
    flow: "79 L/min",
    pressure: "2.2 Bar",
    confidence: "97%",
    action: "Isolation valve closed",
  },
  {
    id: "AQ-2041",
    date: "04 Aug 2026",
    time: "09:30 AM",
    location: "Pipeline Node 8",
    probability: 82,
    response: "7 min",
    status: "Resolved",
    flow: "92 L/min",
    pressure: "3.0 Bar",
    confidence: "89%",
    action: "Maintenance completed",
  },
];

export default function Reports() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reportsData.filter((report) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        report.id.toLowerCase().includes(searchText) ||
        report.location.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);


  const exportCSV = () => {

    const headers = [
      "Incident ID",
      "Date",
      "Time",
      "Location",
      "Probability",
      "Response Time",
      "Status",
    ];

    const rows = filteredReports.map((report) => [
      report.id,
      report.date,
      report.time,
      report.location,
      `${report.probability}%`,
      report.response,
      report.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download =
      "AquaGuard-Incident-Reports.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  return (
    <div className="reports-page">

      <div className="reports-header">

        <div>

          <div className="page-label">
            AQUAGUARD AI / REPORTS
          </div>

          <h1>Incident Reports</h1>

          <p>
            Leak detection history and maintenance records
          </p>

        </div>


        <div className="report-actions">

          <button
            className="secondary-report-btn"
            onClick={() => window.print()}
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


      <section className="reports-stats">

        <div className="report-stat">

          <span>🚨 Total Incidents</span>

          <strong>
            {reportsData.length}
          </strong>

          <small>
            Recorded incidents
          </small>

        </div>


        <div className="report-stat">

          <span>✓ Resolved</span>

          <strong className="green-text">
            {
              reportsData.filter(
                (r) => r.status === "Resolved"
              ).length
            }
          </strong>

          <small>
            Successful resolution
          </small>

        </div>


        <div className="report-stat">

          <span>🤖 Avg AI Probability</span>

          <strong>
            {
              Math.round(
                reportsData.reduce(
                  (sum, r) =>
                    sum + r.probability,
                  0
                ) / reportsData.length
              )
            }%
          </strong>

          <small>
            Detection confidence
          </small>

        </div>


        <div className="report-stat">

          <span>⏱ Avg Response</span>

          <strong>5 min</strong>

          <small>
            Emergency response
          </small>

        </div>

      </section>


      <section className="report-filter-bar">

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

          <option value="All">
            All Status
          </option>

          <option value="Resolved">
            Resolved
          </option>

          <option value="Active">
            Active
          </option>

        </select>

      </section>


      <section className="panel reports-panel">

        <div className="reports-panel-header">

          <div>

            <h2>
              📋 Detection History
            </h2>

            <p>
              Showing {filteredReports.length} of{" "}
              {reportsData.length} incidents
            </p>

          </div>

          <span className="records-badge">
            LIVE DATA
          </span>

        </div>


        <div className="reports-table">

          <div className="report-row report-table-header">

            <span>ID</span>
            <span>Date & Time</span>
            <span>Location</span>
            <span>Probability</span>
            <span>Response</span>
            <span>Status</span>
            <span>Action</span>

          </div>


          {filteredReports.map((report) => (

            <div
              className="report-row"
              key={report.id}
            >

              <span className="report-id">
                {report.id}
              </span>

              <span>
                {report.date}

                <small className="table-time">
                  {report.time}
                </small>
              </span>

              <span>
                📍 {report.location}
              </span>

              <span
                className={
                  report.probability >= 90
                    ? "probability high"
                    : "probability"
                }
              >
                {report.probability}%
              </span>

              <span>
                {report.response}
              </span>

              <span className="status-resolved">
                ● {report.status}
              </span>

              <button
                className="view-btn"
                onClick={() =>
                  setSelectedReport(report)
                }
              >
                View
              </button>

            </div>

          ))}

        </div>

      </section>


      {selectedReport && (

        <div className="report-overlay">

          <div className="report-modal">

            <div className="modal-header">

              <div>

                <div className="modal-label">
                  INCIDENT REPORT
                </div>

                <h2>
                  {selectedReport.id}
                </h2>

                <p>
                  Detailed leak detection report
                </p>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedReport(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="incident-status-box">

              <div>

                <span>Status</span>

                <strong className="green-text">
                  ✓ {selectedReport.status}
                </strong>

              </div>


              <div>

                <span>AI Probability</span>

                <strong className="red-value">
                  {selectedReport.probability}%
                </strong>

              </div>

            </div>


            <div className="report-details">

              <div className="detail-item">
                <span>Incident ID</span>
                <strong>{selectedReport.id}</strong>
              </div>

              <div className="detail-item">
                <span>Date</span>
                <strong>{selectedReport.date}</strong>
              </div>

              <div className="detail-item">
                <span>Time</span>
                <strong>{selectedReport.time}</strong>
              </div>

              <div className="detail-item">
                <span>Location</span>
                <strong>{selectedReport.location}</strong>
              </div>

              <div className="detail-item">
                <span>Flow Rate</span>
                <strong>{selectedReport.flow}</strong>
              </div>

              <div className="detail-item">
                <span>Pressure</span>
                <strong>{selectedReport.pressure}</strong>
              </div>

              <div className="detail-item">
                <span>AI Confidence</span>
                <strong>{selectedReport.confidence}</strong>
              </div>

              <div className="detail-item">
                <span>Response Time</span>
                <strong>{selectedReport.response}</strong>
              </div>

            </div>


            <div className="report-timeline">

              <h3>
                Incident Timeline
              </h3>

              <div className="timeline-item">
                <span>✓</span>

                <div>
                  <strong>Leak detected</strong>

                  <small>
                    AI identified abnormal flow
                    and pressure patterns.
                  </small>
                </div>
              </div>


              <div className="timeline-item">
                <span>✓</span>

                <div>
                  <strong>Location identified</strong>

                  <small>
                    {selectedReport.location}
                    identified as the affected
                    pipeline section.
                  </small>
                </div>
              </div>


              <div className="timeline-item">
                <span>✓</span>

                <div>
                  <strong>Administrator alerted</strong>

                  <small>
                    High-priority incident
                    notification generated.
                  </small>
                </div>
              </div>


              <div className="timeline-item">
                <span>✓</span>

                <div>
                  <strong>Maintenance response</strong>

                  <small>
                    {selectedReport.action}
                  </small>
                </div>
              </div>


              <div className="timeline-item">
                <span>✓</span>

                <div>
                  <strong>Incident resolved</strong>

                  <small>
                    Water network returned to
                    normal operation.
                  </small>
                </div>
              </div>

            </div>


            <button
              className="close-report-btn"
              onClick={() =>
                setSelectedReport(null)
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