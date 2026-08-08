import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SensorCharts({ leakDetected }) {
  const sensorData = leakDetected
    ? [
        { time: "10:00", flow: 120, pressure: 4.3 },
        { time: "10:02", flow: 119, pressure: 4.2 },
        { time: "10:04", flow: 121, pressure: 4.3 },
        { time: "10:06", flow: 120, pressure: 4.3 },
        { time: "10:08", flow: 118, pressure: 4.2 },
        { time: "10:10", flow: 82, pressure: 2.1 },
      ]
    : [
        { time: "10:00", flow: 120, pressure: 4.3 },
        { time: "10:02", flow: 119, pressure: 4.2 },
        { time: "10:04", flow: 121, pressure: 4.3 },
        { time: "10:06", flow: 120, pressure: 4.3 },
        { time: "10:08", flow: 118, pressure: 4.2 },
        { time: "10:10", flow: 120, pressure: 4.3 },
      ];

  return (
    <div className="charts-grid">

      {/* Pressure Chart */}
      <div className="panel chart-panel">

        <div className="chart-header">
          <div>
            <h2>Pressure Monitoring</h2>
            <p>Pipeline pressure over time</p>
          </div>

          <span className="chart-value pressure-value">
            {leakDetected ? "2.1 Bar" : "4.3 Bar"}
          </span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sensorData}>

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
              stroke={leakDetected ? "#ef4444" : "#38bdf8"}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: leakDetected ? "#ef4444" : "#38bdf8",
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>


      {/* Flow Chart */}
      <div className="panel chart-panel">

        <div className="chart-header">
          <div>
            <h2>Water Flow Monitoring</h2>
            <p>Water flow rate over time</p>
          </div>

          <span className="chart-value flow-value">
            {leakDetected ? "82 L/min" : "120 L/min"}
          </span>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sensorData}>

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
              domain={[0, 140]}
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
              stroke={leakDetected ? "#ef4444" : "#22c55e"}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: leakDetected ? "#ef4444" : "#22c55e",
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}