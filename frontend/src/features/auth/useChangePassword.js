import { useState } from "react";
import { changePassword } from "@/services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function updatePassword(currentPassword, newPassword) {
    setIsLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { updatePassword, isLoading };
}

export default useChangePassword;
