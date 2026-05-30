import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useLogin from "@/features/auth/useLogin";
import { Spinner } from "@/components/ui/spinner";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser, isLoading, error } = useLogin();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginUser(form);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-semibold text-zinc-100">
            SQL Studio
          </span>
        </div>

        <div
          className="rounded-xl border border-zinc-800 p-6"
          style={{ backgroundColor: "#27272a" }}
        >
          <h1 className="text-lg font-semibold text-zinc-100 mb-1">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-zinc-400">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-zinc-400">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
              />
            </div>

            <Button type="submit" className="w-full h-9 text-sm mt-1">
              {isLoading ? <Spinner /> : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
