import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  // LOGIN
  if (!loggedIn) {
    return (
      <Login
        onLogin={() => {
          setLoggedIn(true);
          setPage("dashboard");
        }}
      />
    );
  }

  // LOGOUT
  const handleLogout = () => {
    setLoggedIn(false);
    setPage("dashboard");
  };

  // PAGE NAVIGATION
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={setPage} />;

      case "analytics":
        return <Analytics />;

      case "reports":
        return <Reports />;

      case "alerts":
        return <Alerts />;

      default:
        return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* LOGO */}
        <div className="brand">

          <div className="brand-icon">
            💧
          </div>

          <div>
            <strong>AquaGuard</strong>
            <span>AI</span>
          </div>

        </div>

        <div className="sidebar-subtitle">
          SMART WATER NETWORK
        </div>


        {/* NAVIGATION */}
        <nav className="sidebar-nav">

          <button
            type="button"
            className={
              page === "dashboard"
                ? "sidebar-link active-nav"
                : "sidebar-link"
            }
            onClick={() => setPage("dashboard")}
          >
            <span>🏠</span>
            Dashboard
          </button>


          <button
            type="button"
            className={
              page === "analytics"
                ? "sidebar-link active-nav"
                : "sidebar-link"
            }
            onClick={() => setPage("analytics")}
          >
            <span>📊</span>
            Analytics
          </button>


          <button
            type="button"
            className={
              page === "reports"
                ? "sidebar-link active-nav"
                : "sidebar-link"
            }
            onClick={() => setPage("reports")}
          >
            <span>📄</span>
            Reports
          </button>


          <button
            type="button"
            className={
              page === "alerts"
                ? "sidebar-link active-nav"
                : "sidebar-link"
            }
            onClick={() => setPage("alerts")}
          >
            <span>🔔</span>
            Alerts
          </button>

        </nav>


        {/* BOTTOM */}
        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="status-dot"></span>

            <div>
              <strong>System Online</strong>

              <small>
                All services operational
              </small>
            </div>

          </div>


          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="content-area">

        {renderPage()}

      </main>

    </div>
  );
}

export default App;