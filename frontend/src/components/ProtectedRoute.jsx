import { useGetMe } from "@/features/auth/useGetMe";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useGetMe();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="size-6" />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
