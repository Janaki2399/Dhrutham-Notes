import { useLocation, useNavigate } from "react-router-dom";
import { InputError } from "./SignUp";
import { useState } from "react";
import { login } from "../services/login";
import { Loader } from "../components/Loader";
import { useAuth } from "../contexts/auth-context";
import notes from "../assets/Add notes-amico.svg";
import { API_STATUS } from "../constants";
import { useForms } from "../hooks/useForms";

export const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { touchedFields, handleOnChange, handleOnBlur, validateLogin } =
    useForms(setUserDetails);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      userDetails,
      state: location.state,
      navigate,
      setToken,
      setStatus,
      setErrorMessage,
    });
  };
  const errors = validateLogin(userDetails.email, userDetails.password);

  const shouldShowErrors = (field) => {
    return errors[field] ? touchedFields[field] : false;
  };

  const getInputClassName = (field) => {
    return shouldShowErrors(field) ? "error-input-box" : "generic-input-box";
  };
  return (
    <div className="flex flex-col items-center justify-evenly h-screen md:flex-row md:flex bg-gray-50">
      <div className="w-2/5">
        <img src={notes} alt="img" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-7 text-primary-color text-2xl font-medium">
          Dhrutham Notes
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl border p-7 shadow-lg bg-white"
          noValidate
        >
          <div className="text-2xl mb-3 text-center font-semibold">Login</div>

          <div className="flex-column">
            <label className="input-label">Email</label>
            <input
              type="email"
              className={getInputClassName("email")}
              onChange={handleOnChange("email")}
              onBlur={() => handleOnBlur("email")}
            />
            {shouldShowErrors("email") && <InputError error={errors.email} />}
          </div>

          <div className="flex-column">
            <label className="input-label">Password</label>
            <input
              type="password"
              className={getInputClassName("password")}
              onChange={handleOnChange("password")}
              onBlur={() => handleOnBlur("password")}
            />
            {shouldShowErrors("password") && (
              <InputError error={errors.password} />
            )}
          </div>

          <div>
            <button className="bg-primary-color text-white p-1 w-full mt-5">
              LOGIN
            </button>
          </div>

          <div className="mt-3 text-center text-md">
            Don't have an account?
            <span
              className="text-primary-color font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </form>
        {status === API_STATUS.LOADING && (
          <div className="mt-5">
            <Loader />
          </div>
        )}
        {status === API_STATUS.ERROR && (
          <div className="mt-5">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
