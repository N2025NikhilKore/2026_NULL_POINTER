import { createContext, useContext, useState } from "react";

const AquaGuardContext = createContext();

export function AquaGuardProvider({ children }) {
  const [leakDetected, setLeakDetected] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [valveClosed, setValveClosed] = useState(false);

  const [sensorData, setSensorData] = useState({
    flowRate: 120,
    pressure: 4.3,
    leakProbability: 4,
    aiConfidence: 98,
  });

  const [incidents, setIncidents] = useState([
    {
      id: "AQ-2045",
      date: "08 Aug 2026",
      time: "10:10 AM",
      location: "Pipeline Node 3",
      probability: 96,
      response: "4 min",
      status: "Resolved",
    },
    {
      id: "AQ-2044",
      date: "07 Aug 2026",
      time: "02:35 PM",
      location: "Pipeline Node 7",
      probability: 91,
      response: "6 min",
      status: "Resolved",
    },
    {
      id: "AQ-2043",
      date: "06 Aug 2026",
      time: "11:20 AM",
      location: "Pipeline Node 2",
      probability: 87,
      response: "5 min",
      status: "Resolved",
    },
    {
      id: "AQ-2042",
      date: "05 Aug 2026",
      time: "04:45 PM",
      location: "Pipeline Node 5",
      probability: 94,
      response: "3 min",
      status: "Resolved",
    },
    {
      id: "AQ-2041",
      date: "04 Aug 2026",
      time: "09:30 AM",
      location: "Pipeline Node 8",
      probability: 82,
      response: "7 min",
      status: "Resolved",
    },
  ]);

  const simulateLeak = () => {
    setLeakDetected(true);

    setSensorData({
      flowRate: 82,
      pressure: 2.1,
      leakProbability: 96,
      aiConfidence: 98,
    });

    setTicketCreated(true);

    setValveClosed(false);

    const newIncident = {
      id: `AQ-${2046 + incidents.length}`,
      date: "08 Aug 2026",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: "Pipeline Node 3",
      probability: 96,
      response: "2 min",
      status: "Active",
    };

    setIncidents((previous) => [
      newIncident,
      ...previous,
    ]);
  };

  const resetSystem = () => {
    setLeakDetected(false);
    setTicketCreated(false);
    setValveClosed(false);

    setSensorData({
      flowRate: 120,
      pressure: 4.3,
      leakProbability: 4,
      aiConfidence: 98,
    });
  };

  const closeValve = () => {
    setValveClosed(true);
  };

  const resolveIncident = (incidentId) => {
    setIncidents((previous) =>
      previous.map((incident) =>
        incident.id === incidentId
          ? {
              ...incident,
              status: "Resolved",
            }
          : incident
      )
    );

    setLeakDetected(false);

    setSensorData({
      flowRate: 120,
      pressure: 4.3,
      leakProbability: 4,
      aiConfidence: 98,
    });
  };

  return (
    <AquaGuardContext.Provider
      value={{
        leakDetected,
        ticketCreated,
        valveClosed,
        sensorData,
        incidents,

        simulateLeak,
        resetSystem,
        closeValve,
        resolveIncident,
      }}
    >
      {children}
    </AquaGuardContext.Provider>
  );
}

export function useAquaGuard() {
  const context = useContext(AquaGuardContext);

  if (!context) {
    throw new Error(
      "useAquaGuard must be used inside AquaGuardProvider"
    );
  }

  return context;
}