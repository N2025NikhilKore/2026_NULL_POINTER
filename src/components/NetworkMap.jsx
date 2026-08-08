import React from "react";
import { useAquaGuard } from "../context/AquaGuardContext";

function NetworkMap() {
  const {
    incidents,
    leakDetected,
  } = useAquaGuard();

  const nodes = [
    {
      id: "node-1",
      name: "Pipeline Node 1",
      shortName: "N1",
      type: "Sensor",
      x: 15,
      y: 30,
    },
    {
      id: "node-2",
      name: "Pipeline Node 2",
      shortName: "N2",
      type: "Sensor",
      x: 32,
      y: 45,
    },
    {
      id: "node-3",
      name: "Pipeline Node 3",
      shortName: "N3",
      type: "Leak Sensor",
      x: 52,
      y: 32,
    },
    {
      id: "node-4",
      name: "Pipeline Node 4",
      shortName: "N4",
      type: "Sensor",
      x: 70,
      y: 48,
    },
    {
      id: "node-5",
      name: "Pipeline Node 5",
      shortName: "N5",
      type: "Sensor",
      x: 85,
      y: 30,
    },
  ];

  const activeIncident = incidents.find(
    (incident) =>
      incident.status === "Active"
  );

  return (
    <div className="network-map-panel">

      {/* HEADER */}

      <div className="network-map-header">

        <div>
          <span className="page-label">
            LIVE NETWORK
          </span>

          <h2>
            📍 Pipeline Location Map
          </h2>

          <p>
            Real-time location of connected water
            network sensors
          </p>
        </div>

        <div className="map-live-status">
          <span></span>
          LIVE
        </div>

      </div>


      {/* MAP */}

      <div className="network-map">

        {/* GRID */}

        <div className="map-grid"></div>


        {/* WATER NETWORK LINE */}

        <div className="pipeline-line line-1"></div>

        <div className="pipeline-line line-2"></div>

        <div className="pipeline-line line-3"></div>

        <div className="pipeline-line line-4"></div>


        {/* TANK */}

        <div
          className="map-location tank-location"
          style={{
            left: "5%",
            top: "58%",
          }}
        >

          <div className="location-icon tank">
            🏭
          </div>

          <strong>
            Main Tank
          </strong>

          <small>
            Water Source
          </small>

        </div>


        {/* NODES */}

        {nodes.map((node) => {

          const isLeakNode =
            leakDetected &&
            node.id === "node-3";

          return (
            <div
              key={node.id}
              className={
                isLeakNode
                  ? "map-location sensor-location leak-location-map"
                  : "map-location sensor-location"
              }
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >

              <div
                className={
                  isLeakNode
                    ? "location-icon leak-icon"
                    : "location-icon sensor-icon"
                }
              >
                {isLeakNode ? "🚨" : "●"}
              </div>

              <strong>
                {node.shortName}
              </strong>

              <small>
                {node.name.replace(
                  "Pipeline ",
                  ""
                )}
              </small>

            </div>
          );
        })}


        {/* DISTRIBUTION */}

        <div
          className="map-location distribution-location"
          style={{
            left: "88%",
            top: "65%",
          }}
        >

          <div className="location-icon house">
            🏠
          </div>

          <strong>
            Distribution
          </strong>

          <small>
            Water Supply
          </small>

        </div>


        {/* LEAK WARNING */}

        {activeIncident && (

          <div className="map-alert">

            <div className="map-alert-icon">
              🚨
            </div>

            <div>

              <strong>
                Leak Detected
              </strong>

              <span>
                {activeIncident.location}
              </span>

            </div>

            <div className="map-alert-probability">
              {activeIncident.probability}%
            </div>

          </div>

        )}


        {/* MAP LEGEND */}

        <div className="map-legend">

          <div>
            <span className="legend-dot green"></span>
            Normal Sensor
          </div>

          <div>
            <span className="legend-dot red"></span>
            Leak Detected
          </div>

          <div>
            <span className="legend-line"></span>
            Pipeline
          </div>

        </div>

      </div>

    </div>
  );
}

export default NetworkMap;