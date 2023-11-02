import React from "react";

import { Navigate, useLocation } from "react-router-dom";

type SignupViewsProps = {
  children: React.ReactElement;
  admin?: boolean;
};

const ProtectedRoute: React.FC<SignupViewsProps> = ({ children, admin }) => {
  let location = useLocation();

  if (!admin) {
    return <Navigate to="/error" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
