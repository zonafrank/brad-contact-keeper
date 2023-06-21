import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contacts/contactsState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alerts from "./components/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <ContactState>
          <Router>
            <>
              <Navbar title="Contact Keeper" />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </>
          </Router>
        </ContactState>
      </AlertState>
    </AuthState>
  );
}

export default App;
