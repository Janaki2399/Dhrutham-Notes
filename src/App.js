import logo from "./logo.svg";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { fetchNotes } from "./services/fetchNotes";
import { useAuth } from "./contexts/auth-context";
import { API_STATUS } from "./constants";
import { useNotes } from "./contexts/notes-context";
import { Loader } from "./components/Loader";

function App() {
  const { token } = useAuth();
  const { notesDispatch } = useNotes();
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (token) {
      fetchNotes({ token, notesDispatch, setStatus, setErrorMessage });
    }
  }, [token, notesDispatch]);

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/" element={<Home />} />
        {/* <Route path="/" element={<QuizCategories />} />  */}
      </Routes>
    </div>
  );
}

export default App;
