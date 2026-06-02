import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import useChangePassword from "./useChangePassword";

function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const { updatePassword, isLoading } = useChangePassword();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    await updatePassword(form.currentPassword, form.newPassword);
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <div
      className="rounded-xl border border-zinc-800 p-6 mt-6"
      style={{ backgroundColor: "#27272a" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Lock className="w-4 h-4 text-zinc-500" />
        <h2 className="text-sm font-medium text-zinc-100">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-400">Current Password</Label>
          <Input
            name="currentPassword"
            type="password"
            placeholder="••••••••"
            value={form.currentPassword}
            onChange={handleChange}
            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-400">New Password</Label>
          <Input
            name="newPassword"
            type="password"
            placeholder="••••••••"
            value={form.newPassword}
            onChange={handleChange}
            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-400">Confirm New Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-950 border border-red-900 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 text-sm"
        >
          {isLoading ? <Spinner className="size-3" /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
