import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const ProtectedRoute = () => {
  const { token } = useAuthStore(); 
  const authToken = token || localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
