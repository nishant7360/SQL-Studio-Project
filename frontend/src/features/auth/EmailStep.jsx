import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

function EmailStep({ email, setEmail, onSubmit, isLoading }) {
  return (
    <>
      <h1 className="text-lg font-semibold text-zinc-100 mb-1">
        Forgot password
      </h1>
      <p className="text-xs text-zinc-500 mb-6">
        Enter your email and we'll send you an OTP
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-400">Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 text-sm"
        >
          {isLoading ? <Spinner className="size-3" /> : "Send OTP"}
        </Button>
      </form>
    </>
  );
}

export default EmailStep;
