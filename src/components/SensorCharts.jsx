import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10:00", flow: 120, pressure: 4.3 },
  { time: "10:02", flow: 119, pressure: 4.2 },
  { time: "10:04", flow: 121, pressure: 4.3 },
  { time: "10:06", flow: 120, pressure: 4.3 },
  { time: "10:08", flow: 118, pressure: 4.2 },
  { time: "10:10", flow: 82, pressure: 2.1 },
];

export default function SensorCharts() {
  return (
    <div className="charts-grid">

      {/* Pressure */}
      <div className="panel chart-panel">
        <h2>Pressure Monitoring</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="#183650" />

            <XAxis
              dataKey="time"
              stroke="#71869a"
            />

            <YAxis
              stroke="#71869a"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="pressure"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Flow */}
      <div className="panel chart-panel">
        <h2>Water Flow Monitoring</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="#183650" />

            <XAxis
              dataKey="time"
              stroke="#71869a"
            />

            <YAxis
              stroke="#71869a"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="flow"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}