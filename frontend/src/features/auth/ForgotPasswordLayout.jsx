import { Link } from "react-router-dom";

function ForgotPasswordLayout({ children, step }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-semibold text-zinc-100">
            SQL Studio
          </span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "bg-primary w-6"
                  : s < step
                    ? "bg-green-500 w-2"
                    : "bg-zinc-700 w-2"
              }`}
            />
          ))}
        </div>

        <div
          className="rounded-xl border border-zinc-800 p-6"
          style={{ backgroundColor: "#27272a" }}
        >
          {children}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordLayout;
