import React, { useEffect, useState } from "react";
import { useAquaGuard } from "../context/AquaGuardContext";

function SensorCharts() {
  const { sensorData, leakDetected } = useAquaGuard();

  const [flowHistory, setFlowHistory] = useState([
    118, 120, 119, 121, 120, 122, 121, 120,
  ]);

  const [pressureHistory, setPressureHistory] = useState([
    4.2, 4.3, 4.25, 4.4, 4.3, 4.35, 4.3, 4.3,
  ]);

  const [leakHistory, setLeakHistory] = useState([
    3, 4, 3, 5, 4, 4, 3, 4,
  ]);

  /*
   * Add a new sensor reading whenever the
   * central AquaGuard sensor state changes.
   */
  useEffect(() => {
    setFlowHistory((previous) => [
      ...previous.slice(-7),
      sensorData.flowRate,
    ]);

    setPressureHistory((previous) => [
      ...previous.slice(-7),
      sensorData.pressure,
    ]);

    setLeakHistory((previous) => [
      ...previous.slice(-7),
      sensorData.leakProbability,
    ]);
  }, [
    sensorData.flowRate,
    sensorData.pressure,
    sensorData.leakProbability,
  ]);

  const getFlowPercentage = (value) => {
    return Math.min(
      100,
      Math.max(0, (value / 150) * 100)
    );
  };

  const getPressurePercentage = (value) => {
    return Math.min(
      100,
      Math.max(0, (value / 5) * 100)
    );
  };

  return (
    <section className="charts-section">

      {/* SECTION HEADER */}

      <div className="panel chart-panel">

        <div className="panel-title">

          <div>
            <h2>
              📈 Real-Time Sensor Data
            </h2>

            <p>
              Live readings from AquaGuard IoT sensors
            </p>
          </div>

          <span
            className={
              leakDetected
                ? "alert-badge"
                : "network-status"
            }
          >
            {leakDetected
              ? "🔴 ALERT"
              : "🟢 LIVE"}
          </span>

        </div>


        {/* CURRENT VALUES */}

        <div className="stats-grid">

          {/* FLOW */}

          <div className="stat-card">

            <span>
              💧 Current Flow
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
                ? "⚠ Abnormal"
                : "✓ Normal"}
            </small>

          </div>


          {/* PRESSURE */}

          <div className="stat-card">

            <span>
              🔵 Current Pressure
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


          {/* LEAK */}

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


          {/* AI CONFIDENCE */}

          <div className="stat-card">

            <span>
              🧠 AI Confidence
            </span>

            <h2>
              {sensorData.aiConfidence}%
            </h2>

            <small className="success-text">
              ✓ Detection Engine
            </small>

          </div>

        </div>


        {/* CHART AREA */}

        <div className="analytics-grid">

          {/* FLOW CHART */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>
                <h2>
                  Flow Rate
                </h2>

                <p>
                  Litres per minute
                </p>
              </div>

              <strong className="metric-blue">
                {sensorData.flowRate} L/min
              </strong>

            </div>


            <div
              style={{
                height: "180px",
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                padding: "20px 5px 5px",
              }}
            >

              {flowHistory.map(
                (value, index) => {

                  const height =
                    getFlowPercentage(value);

                  return (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >

                      <div
                        title={`${value} L/min`}
                        style={{
                          width: "100%",
                          height: `${height}%`,
                          minHeight: "5px",
                          borderRadius:
                            "5px 5px 2px 2px",
                          background:
                            leakDetected
                              ? "linear-gradient(#ff5252, #a52828)"
                              : "linear-gradient(#29bfff, #0878ae)",
                          transition:
                            "height 0.4s ease",
                        }}
                      ></div>

                    </div>
                  );
                }
              )}

            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#66879e",
                fontSize: "10px",
                marginTop: "5px",
              }}
            >
              <span>
                -7 readings
              </span>

              <span>
                Latest
              </span>
            </div>

          </div>


          {/* PRESSURE CHART */}

          <div className="analytics-panel">

            <div className="analytics-panel-header">

              <div>
                <h2>
                  Pressure
                </h2>

                <p>
                  Pipeline pressure
                </p>
              </div>

              <strong className="metric-green">
                {sensorData.pressure} Bar
              </strong>

            </div>


            <div
              style={{
                height: "180px",
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                padding: "20px 5px 5px",
              }}
            >

              {pressureHistory.map(
                (value, index) => {

                  const height =
                    getPressurePercentage(value);

                  return (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >

                      <div
                        title={`${value} Bar`}
                        style={{
                          width: "100%",
                          height: `${height}%`,
                          minHeight: "5px",
                          borderRadius:
                            "5px 5px 2px 2px",
                          background:
                            leakDetected
                              ? "linear-gradient(#ff5252, #a52828)"
                              : "linear-gradient(#32df80, #16834b)",
                          transition:
                            "height 0.4s ease",
                        }}
                      ></div>

                    </div>
                  );
                }
              )}

            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#66879e",
                fontSize: "10px",
                marginTop: "5px",
              }}
            >
              <span>
                -7 readings
              </span>

              <span>
                Latest
              </span>
            </div>

          </div>

        </div>


        {/* LEAK PROBABILITY HISTORY */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>
                🤖 AI Leak Probability
              </h2>

              <p>
                Historical AI detection probability
              </p>
            </div>

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


          <div
            style={{
              height: "150px",
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              padding: "20px 5px 5px",
            }}
          >

            {leakHistory.map(
              (value, index) => {

                const height =
                  Math.min(100, value);

                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >

                    <div
                      title={`${value}%`}
                      style={{
                        width: "100%",
                        height: `${height}%`,
                        minHeight: "5px",
                        borderRadius:
                          "5px 5px 2px 2px",
                        background:
                          value >= 80
                            ? "#ff4141"
                            : "#a855f7",
                        transition:
                          "height 0.4s ease",
                      }}
                    ></div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default SensorCharts;