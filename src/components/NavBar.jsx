import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { setupAuthExceptionHandler } from "../helper";

export const NavBar = ({ setLabelListOpen }) => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("login");
    navigate("/");
  };
  setupAuthExceptionHandler(logout, navigate);
  return (
    <nav className="navbar flex justify-between align-middle fixed z-10 justify-items-center">
      <div className="flex ">
        <button
          className="md:hidden cursor-pointer focus:outline-none"
          onClick={() => setLabelListOpen((prevState) => !prevState)}
        >
          <span className="material-icons-outlined">menu</span>
        </button>
        <div
          className="text-primary-color font-semibold text-xl ml-3 "
          onClick={() => {
            navigate("/");
          }}
        >
          Dhrutham Notes
        </div>
      </div>

      <div className="mr-3">
        {!token ? (
          <Link to="/login" className=" nav-item anchor-link">
            Login
          </Link>
        ) : (
          <div className="nav-item cursor-pointer" onClick={logout}>
            <span className="material-icons-outlined">logout</span>
          </div>
        )}
      </div>
    </nav>
  );
};
