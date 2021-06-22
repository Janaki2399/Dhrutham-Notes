import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/signUp";
import { API_STATUS } from "../constants";
import { useAuth } from "../contexts/auth-context";
import { Loader } from "../components/Loader";
import notes from "../assets/Add notes-amico.svg";
import { useForms } from "../hooks/useForms";

export function SignUp() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const { touchedFields, handleOnChange, handleOnBlur, validateSignUp } =
    useForms(setUserDetails);

  function handleSignUp(e) {
    e.preventDefault();

    signUp({
      userDetails,
      navigate,
      setStatus,
      token,
      setToken,
      setErrorMessage,
    });
  }
  const errors = validateSignUp(
    userDetails.firstName,
    userDetails.lastName,
    userDetails.email,
    userDetails.password
  );

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
        <div className="mb-4 text-primary-color text-2xl font-medium">
          Dhrutham Notes
        </div>
        <form
          onSubmit={handleSignUp}
          className="max-w-2xl border p-7 shadow-lg"
          noValidate
        >
          <div className="text-xl mb-3 text-center font-semibold">Sign Up</div>
          <div>
            <label className="input-label">First Name</label>
            <input
              type="text"
              className={getInputClassName("firstName")}
              onChange={handleOnChange("firstName")}
              onBlur={() => handleOnBlur("firstName")}
            />
            {shouldShowErrors("firstName") && (
              <InputError error={errors.firstName} />
            )}
          </div>

          <div>
            <label className="input-label">Last Name</label>
            <input
              type="text"
              className={getInputClassName("lastName")}
              onChange={handleOnChange("lastName")}
              onBlur={() => handleOnBlur("lastName")}
            />
            {shouldShowErrors("lastName") && (
              <InputError error={errors.lastName} />
            )}
          </div>

          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              className={getInputClassName("email")}
              required
              onChange={handleOnChange("email")}
              onBlur={() => handleOnBlur("email")}
            />
            {shouldShowErrors("email") && <InputError error={errors.email} />}
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              className={getInputClassName("password")}
              required
              onChange={handleOnChange("password")}
              onBlur={() => handleOnBlur("password")}
            />
            {shouldShowErrors("password") && (
              <InputError error={errors.password} />
            )}
          </div>

          <div>
            <button
              className="bg-primary-color text-white p-1 w-full mt-5"
              type="submit"
            >
              SIGN UP
            </button>
          </div>

          <div className="mt-3 text-center text-md">
            Already have an account?
            <span
              className="text-primary-color font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
        {(status === API_STATUS.LOADING || status === API_STATUS.IDLE) && (
          <div className="mt-5">
            <Loader />
          </div>
        )}
        {status === API_STATUS.ERROR && (
          <div className="mt-5 bg-red-200">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export const InputError = ({ error }) => {
  return (
    <span role="alert" className="error-text">
      {error}
    </span>
  );
};
