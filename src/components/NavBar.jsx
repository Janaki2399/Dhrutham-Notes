import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const logout = () => {
    setToken(null);
    localStorage?.removeItem("login");
    navigate("/");
  };

  return (
    <div className="navbar flex justify-between align-middle">
      <div
        className="text-primary-color font-semibold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Dhrutham Notes
      </div>
      <div className="flex">
        <div className="mr-3">
          {!token ? (
            <Link to="/login" className=" nav-item anchor-link">
              Login
            </Link>
          ) : (
            <div className="nav-item cursor-pointer" onClick={logout}>
              Logout
            </div>
          )}
        </div>
        {/* <div>
          <Link to="/progress_list" className=" nav-item anchor-link">
            My Progress
          </Link>
        </div> */}
      </div>
    </div>
  );
};
