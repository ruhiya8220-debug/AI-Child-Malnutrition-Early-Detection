import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [isRegister, setIsRegister] = useState(false);

  const [child, setChild] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const [prediction, setPrediction] = useState("");
  const [savedChild, setSavedChild] = useState(null);

  const handleChange = (e) => {
    setChild({
      ...child,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrediction = () => {
    if (
      !child.age ||
      !child.height ||
      !child.weight ||
      !child.gender
    ) {
      alert("Please enter all required health details.");
      return;
    }

    // Temporary frontend prediction.
    // Later this will be replaced with the actual DNN model.
    const age = Number(child.age);
    const height = Number(child.height);
    const weight = Number(child.weight);

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi < 13.5) {
      setPrediction("High Risk");
    } else if (bmi < 15) {
      setPrediction("Moderate Risk");
    } else {
      setPrediction("Low Risk");
    }
  };

  /* AI Risk Prediction Page */

  if (page === "prediction") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>AI Child Malnutrition Detection</h1>
            <p>AI-powered nutritional risk screening</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>
        </header>

        <main className="form-container">
          <div className="form-card">
            <h2>AI Risk Prediction</h2>

            <p className="form-description">
              Enter the child's health information to perform
              preliminary nutritional risk screening.
            </p>

            <div className="form-grid">
              <div className="input-group">
                <label>Child Name</label>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) =>
                    setChild({
                      ...child,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter child's name"
                />
              </div>

              <div className="input-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={child.age}
                  onChange={handleChange}
                  placeholder="Age in years"
                />
              </div>

              <div className="input-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={child.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={child.height}
                  onChange={handleChange}
                  placeholder="Enter height"
                />
              </div>

              <div className="input-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={child.weight}
                  onChange={handleChange}
                  placeholder="Enter weight"
                />
              </div>
            </div>

            <button
              className="login-btn"
              onClick={handlePrediction}
            >
              Predict Nutritional Risk
            </button>

            {prediction && (
              <div className="prediction-result">
                <h3>Prediction Result</h3>

                <p>
                  Child: <strong>{child.name || "Child"}</strong>
                </p>

                <p>
                  Nutritional Risk Level:
                </p>

                <strong className="risk-result">
                  {prediction}
                </strong>

                <p className="prediction-note">
                  This is a preliminary screening result.
                  The final project will use the trained DNN
                  model for prediction.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* Add Child Page */

  if (page === "add-child") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>AI Child Malnutrition Detection</h1>
            <p>Add Child Health Information</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => setPage("dashboard")}
          >
            Back to Dashboard
          </button>
        </header>

        <main className="form-container">
          <div className="form-card">
            <h2>Add New Child</h2>

            <p className="form-description">
              Enter the child's basic and health information
              for early nutritional risk screening.
            </p>

            <div className="form-grid">
              <div className="input-group">
                <label>Child Name</label>
                <input
                  type="text"
                  name="name"
                  value={child.name}
                  onChange={handleChange}
                  placeholder="Enter child's name"
                />
              </div>

              <div className="input-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={child.age}
                  onChange={handleChange}
                  placeholder="Age in years"
                />
              </div>

              <div className="input-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={child.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Height</label>
                <input
                  type="number"
                  name="height"
                  value={child.height}
                  onChange={handleChange}
                  placeholder="Height in cm"
                />
              </div>

              <div className="input-group">
                <label>Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={child.weight}
                  onChange={handleChange}
                  placeholder="Weight in kg"
                />
              </div>
            </div>

            <button
              className="login-btn"
              onClick={() => {
  setSavedChild(child);
  setPage("dashboard");
}}
            >
              Save Child Information
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* Dashboard Page */

  if (page === "dashboard") {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1>AI Child Malnutrition Detection</h1>
            <p>Early risk screening and growth monitoring</p>
          </div>

          <button
            className="logout-btn"
            onClick={() => setPage("login")}
          >
            Logout
          </button>
        </header>

        <main className="dashboard-content">
          <h2>Dashboard</h2>

          <p className="dashboard-welcome">
            Welcome to your child health monitoring dashboard.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">C</span>
              <h3>Total Children</h3>
              <strong>0</strong>
              <p>Children registered</p>
            </div>

            <div className="stat-card high-risk">
              <span className="stat-icon">H</span>
              <h3>High Risk</h3>
              <strong>0</strong>
              <p>Need attention</p>
            </div>

            <div className="stat-card moderate-risk">
              <span className="stat-icon">M</span>
              <h3>Moderate Risk</h3>
              <strong>0</strong>
              <p>Need monitoring</p>
            </div>

            <div className="stat-card low-risk">
              <span className="stat-icon">L</span>
              <h3>Low Risk</h3>
              <strong>0</strong>
              <p>Currently stable</p>
            </div>
          </div>

          <section className="quick-section">
            <h2>Quick Actions</h2>

            <div className="action-grid">
              <button
                className="action-card"
                onClick={() => setPage("add-child")}
              >
                <span>Add</span>
                <h3>Add New Child</h3>
                <p>Register child health information</p>
              </button>

              <button
                className="action-card"
                onClick={() => setPage("prediction")}
              >
                <span>AI</span>
                <h3>AI Risk Prediction</h3>
                <p>Check nutritional risk level</p>
              </button>

              <button className="action-card">
                <span>Growth</span>
                <h3>Growth Monitoring</h3>
                <p>Monitor height and weight</p>
              </button>

              <button className="action-card">
                <span>Report</span>
                <h3>Health Report</h3>
                <p>View child health history</p>
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* Login / Register Page */

  return (
    <div className="app">
      <div className="login-card">
        <div className="logo">AI</div>

        <h1>Child Malnutrition Detection</h1>

        <p className="subtitle">
          AI-powered early risk screening system
        </p>

        <h2>
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        {isRegister && (
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>
        )}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="login-btn"
          onClick={() => setPage("dashboard")}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="switch-text">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            className="switch-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? " Login" : " Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;