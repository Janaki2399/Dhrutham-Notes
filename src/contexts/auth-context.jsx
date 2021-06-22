import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token: savedToken } = JSON.parse(localStorage?.getItem("login")) || {
    token: null,
  };
  const [token, setToken] = useState(savedToken);

  //   function setupAuthHeaderForServiceCalls(token) {
  //     if (token) {
  //       return (axios.defaults.headers.common["Authorization"] = token);
  //     }
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  //   const login = async (email, password, state) => {
  //     try {
  //       const { data, status } = await axios.post(
  //         "https://dhrutham-play-backend.herokuapp.com/user/login",
  //         {
  //           email: email,
  //           password: password,
  //         }
  //       );

  //       if (status === 200) {
  //         setToken(data.token);
  //         navigate(state?.from ? state.from : "/");
  //         // setupAuthHeaderForServiceCalls(data.token);
  //         localStorage?.setItem("login", JSON.stringify({ token: data.token }));
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  //   const signUp = async ({ firstName, lastName, email, password }) => {
  //     try {
  //       const { status } = await axios.post(
  //         "https://dhrutham-play-backend.herokuapp.com/user/signup",
  //         {
  //           firstName: firstName,
  //           lastName: lastName,
  //           email: email,
  //           password: password,
  //         }
  //       );
  //       if (status === 200) {
  //         navigate("/login");
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,

        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
