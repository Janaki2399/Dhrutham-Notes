import logo from "./logo.svg";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<QuizCategories />} />  */}
      </Routes>
    </div>
  );
}

export default App;
