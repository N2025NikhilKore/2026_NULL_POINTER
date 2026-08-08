import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const normalData = [
  { time: "10:00", flow: 118, pressure: 4.2 },
  { time: "10:05", flow: 121, pressure: 4.3 },
  { time: "10:10", flow: 120, pressure: 4.3 },
  { time: "10:15", flow: 122, pressure: 4.4 },
  { time: "10:20", flow: 119, pressure: 4.2 },
  { time: "10:25", flow: 120, pressure: 4.3 },
];

const leakData = [
  { time: "10:00", flow: 120, pressure: 4.3 },
  { time: "10:05", flow: 118, pressure: 4.1 },
  { time: "10:10", flow: 105, pressure: 3.6 },
  { time: "10:15", flow: 96, pressure: 3.0 },
  { time: "10:20", flow: 82, pressure: 2.1 },
  { time: "10:25", flow: 80, pressure: 2.0 },
];

export default function SensorCharts({
  leakDetected = false,
}) {

  const data = leakDetected
    ? leakData
    : normalData;

  return (
    <section className="charts-section">

      <div className="panel chart-panel">

        <div className="panel-title">

          <div>
            <h2>
              📈 Flow & Pressure Monitoring
            </h2>

            <p>
              Real-time sensor trends
            </p>
          </div>

          <span className="network-status">
            🟢 LIVE
          </span>

        </div>


        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={data}>

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
              name="Flow L/min"
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="pressure"
              name="Pressure Bar"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}