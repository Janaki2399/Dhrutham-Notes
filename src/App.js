import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";
import { Toast } from "./components/Toast";
import { PrivateRoute } from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { fetchNotes } from "./services/fetchNotes";
import { fetchLabelList } from "./services/fetchLabelList";
import { useAuth } from "./contexts/auth-context";
import { API_STATUS } from "./constants";
import { useNotes } from "./contexts/notes-context";
import { Loader } from "./components/Loader";
import { useToast } from "./contexts/toast-context";
import { Error } from "./components/Error";

function App() {
  const { token } = useAuth();
  const { notesDispatch } = useNotes();
  const { toast } = useToast();
  const [isLabelListOpen, setLabelListOpen] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  useEffect(() => {
    if (token) {
      fetchNotes({ token, notesDispatch, setStatus });
      fetchLabelList({ token, notesDispatch, setStatus });
    }
  }, [token, notesDispatch]);

  if (status === API_STATUS.LOADING) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (status === API_STATUS.ERROR) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  return (
    <div className="App">
      {token && <NavBar setLabelListOpen={setLabelListOpen} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute
          path="/"
          element={<Home isLabelListOpen={isLabelListOpen} />}
        />
        <PrivateRoute
          path="/labels/:labelName"
          element={<Home isLabelListOpen={isLabelListOpen} />}
        />
      </Routes>
      {toast !== "" && <Toast message={toast} />}
    </div>
  );
}

export default App;
