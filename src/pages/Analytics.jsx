import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const flowData = [
  { time: "08:00", flow: 118 },
  { time: "09:00", flow: 121 },
  { time: "10:00", flow: 120 },
  { time: "11:00", flow: 119 },
  { time: "12:00", flow: 122 },
  { time: "13:00", flow: 82 },
  { time: "14:00", flow: 117 },
];

const pressureData = [
  { time: "08:00", pressure: 4.2 },
  { time: "09:00", pressure: 4.3 },
  { time: "10:00", pressure: 4.3 },
  { time: "11:00", pressure: 4.2 },
  { time: "12:00", pressure: 4.4 },
  { time: "13:00", pressure: 2.1 },
  { time: "14:00", pressure: 4.2 },
];

const incidentData = [
  { day: "Mon", leaks: 2 },
  { day: "Tue", leaks: 1 },
  { day: "Wed", leaks: 3 },
  { day: "Thu", leaks: 1 },
  { day: "Fri", leaks: 2 },
  { day: "Sat", leaks: 0 },
  { day: "Sun", leaks: 1 },
];

export default function Analytics() {
  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <div>

          <h1>System Analytics</h1>

          <p>
            Historical performance and AI monitoring insights
          </p>

        </div>

        <div className="analytics-period">
          Last 7 Days ▾
        </div>

      </div>


      {/* SUMMARY */}

      <section className="analytics-stats">

        <div className="analytics-card">
          <span>🚨 Total Leaks Detected</span>

          <h2>10</h2>

          <small className="positive">
            ↓ 18% from last week
          </small>
        </div>


        <div className="analytics-card">
          <span>💧 Water Saved</span>

          <h2>1,840 L</h2>

          <small className="positive">
            ↑ 24% efficiency
          </small>
        </div>


        <div className="analytics-card">
          <span>⏱ Avg Response Time</span>

          <h2>4.8 min</h2>

          <small className="positive">
            ↓ 32% faster
          </small>
        </div>


        <div className="analytics-card">
          <span>🤖 AI Detection Accuracy</span>

          <h2>98.4%</h2>

          <small className="positive">
            ↑ 2.1% improvement
          </small>
        </div>

      </section>


      {/* FLOW + PRESSURE */}

      <section className="analytics-grid">

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>💧 Flow Rate History</h2>

              <p>
                Litres per minute
              </p>

            </div>

            <span className="metric-green">
              120 L/min
            </span>

          </div>


          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <LineChart data={flowData}>

              <CartesianGrid
                stroke="#183650"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                stroke="#71869a"
              />

              <YAxis
                stroke="#71869a"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1728",
                  border: "1px solid #21435d",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="flow"
                stroke="#22c55e"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>🔵 Pressure History</h2>

              <p>
                Pipeline pressure
              </p>

            </div>

            <span className="metric-blue">
              4.3 Bar
            </span>

          </div>


          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <LineChart data={pressureData}>

              <CartesianGrid
                stroke="#183650"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                stroke="#71869a"
              />

              <YAxis
                stroke="#71869a"
                domain={[0, 5]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1728",
                  border: "1px solid #21435d",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#38bdf8"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </section>


      {/* INCIDENTS + HEALTH */}

      <section className="analytics-grid">

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>

              <h2>🚨 Leak Incidents</h2>

              <p>
                Detected incidents per day
              </p>

            </div>

          </div>


          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <BarChart data={incidentData}>

              <CartesianGrid
                stroke="#183650"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
                stroke="#71869a"
              />

              <YAxis
                stroke="#71869a"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b1728",
                  border: "1px solid #21435d",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="leaks"
                fill="#ef4444"
                radius={[5, 5, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        <div className="analytics-panel">

          <h2>🟢 System Health</h2>


          <div className="health-item">

            <div>
              <span>Flow Sensors</span>
              <strong>100%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill green"
                style={{ width: "100%" }}
              ></div>
            </div>

          </div>


          <div className="health-item">

            <div>
              <span>Pressure Sensors</span>
              <strong>98%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill blue"
                style={{ width: "98%" }}
              ></div>
            </div>

          </div>


          <div className="health-item">

            <div>
              <span>ESP32 Connectivity</span>
              <strong>99%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill cyan"
                style={{ width: "99%" }}
              ></div>
            </div>

          </div>


          <div className="health-item">

            <div>
              <span>AI Detection Engine</span>
              <strong>98.4%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill purple"
                style={{ width: "98.4%" }}
              ></div>
            </div>

          </div>

        </div>

      </section>


      {/* RECENT INCIDENTS */}

      <section className="analytics-panel incidents-panel">

        <div className="analytics-panel-header">

          <div>

            <h2>📋 Recent Incidents</h2>

            <p>
              Latest detected events
            </p>

          </div>

        </div>


        <div className="incident-table">

          <div className="incident-row table-header">

            <span>Incident</span>
            <span>Location</span>
            <span>Probability</span>
            <span>Response</span>
            <span>Status</span>

          </div>


          <div className="incident-row">

            <span>Leak #AQ-2045</span>
            <span>Pipeline Node 3</span>
            <span>96%</span>
            <span>4 min</span>

            <span className="status-resolved">
              Resolved
            </span>

          </div>


          <div className="incident-row">

            <span>Leak #AQ-2044</span>
            <span>Pipeline Node 7</span>
            <span>91%</span>
            <span>6 min</span>

            <span className="status-resolved">
              Resolved
            </span>

          </div>


          <div className="incident-row">

            <span>Leak #AQ-2043</span>
            <span>Pipeline Node 2</span>
            <span>87%</span>
            <span>5 min</span>

            <span className="status-resolved">
              Resolved
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}