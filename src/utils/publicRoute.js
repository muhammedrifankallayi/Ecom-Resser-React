import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextDatas } from "services/context/context";

export { Publicroute };
function Publicroute({ children }) {
  const { user } = useContext(ContextDatas);

  if (user) {
    return <Navigate to="/admin/index" />;
  } else {
    return children;
  }

}
