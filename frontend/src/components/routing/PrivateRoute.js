import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = (props) => {
  const { isAuthenticated, loading, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
