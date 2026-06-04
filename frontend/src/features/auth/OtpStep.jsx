import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

function OtpStep({ email, otp, setOtp, onSubmit, onBack, isLoading }) {
  return (
    <>
      <h1 className="text-lg font-semibold text-zinc-100 mb-1">Enter OTP</h1>
      <p className="text-xs text-zinc-500 mb-6">
        We sent a 6-digit OTP to <span className="text-zinc-300">{email}</span>
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-zinc-400">OTP</Label>
          <Input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
            className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm h-9 tracking-widest text-center"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 text-sm"
        >
          {isLoading ? <Spinner className="size-3" /> : "Verify OTP"}
        </Button>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Wrong email? Go back
        </button>
      </form>
    </>
  );
}

export default OtpStep;
