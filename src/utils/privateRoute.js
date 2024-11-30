import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextDatas } from "services/context/context";

export { PrivateRoute };
function PrivateRoute({ children }) {
  const { user } = useContext(ContextDatas);
  if (user === null) {
    return <Navigate to="/auth/login" />;
  }

  if (user.role != undefined || user.role != null) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
