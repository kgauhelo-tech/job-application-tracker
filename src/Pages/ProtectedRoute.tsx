import React, { Children, useContext, type ReactNode } from "react";
import { UserContext } from "./Auth/UserContext";
import { Navigate } from "react-router";
type Props = {
  children: React.ReactNode;
};
const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
