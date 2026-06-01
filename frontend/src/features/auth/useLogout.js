import { logout } from "@/services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      await logout();
      queryClient.setQueryData(["user"], null); // instantly clears user from cache
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  return { logoutUser };
}

export default useLogout;
