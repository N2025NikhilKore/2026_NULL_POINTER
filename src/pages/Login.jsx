export default function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">💧</div>

        <h1>AquaGuard AI</h1>

        <p>Smart Water Leak Detection</p>

        <form>
          <input
            type="email"
            placeholder="Administrator Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="button" onClick={onLogin}>
            Login to Dashboard
          </button>
        </form>

        <span>AI + IoT Water Monitoring System</span>
      </div>
    </div>
  );
}