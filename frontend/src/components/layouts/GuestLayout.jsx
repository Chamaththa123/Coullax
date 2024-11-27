import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";

export const GuestLayout = () => {
  const { token } = useStateContext();
  const location = useLocation();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen justify-center items-center">
      <Outlet />
    </div>
  );
};
