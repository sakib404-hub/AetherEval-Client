"use client";

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  // Calculate dynamic entropy score (0 to 4)
  const calculateScore = (pwd: string): number => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const score = calculateScore(password);

  const getLabel = () => {
    switch (score) {
      case 0:
        return { text: "Required", color: "text-on-surface-variant" };
      case 1:
        return { text: "Low Entropy", color: "text-rose-400" };
      case 2:
        return { text: "Moderate Security", color: "text-amber-400" };
      case 3:
        return { text: "Strong Passkey", color: "text-blue-400" };
      case 4:
        return { text: "Quantum Cryptographic", color: "text-emerald-400" };
      default:
        return { text: "Required", color: "text-on-surface-variant" };
    }
  };

  const info = getLabel();

  return (
    <div className="w-full space-y-1.5 pt-1">
      <div className="flex justify-between items-center text-body-xs font-headline">
        <span className="text-on-surface-variant">Entropy Strength</span>
        <span className={`font-semibold ${info.color}`}>{info.text}</span>
      </div>

      {/* 4 Segmented Strength Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => {
          const isActive = score >= step;
          let barBg = "bg-white/10";
          if (isActive) {
            if (score === 1) barBg = "bg-rose-500 shadow-[0_0_8px_#f43f5e]";
            else if (score === 2) barBg = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            else if (score === 3) barBg = "bg-blue-500 shadow-[0_0_8px_#3b82f6]";
            else barBg = "bg-emerald-500 shadow-[0_0_8px_#10b981]";
          }

          return (
            <div
              key={step}
              className={`h-full rounded-full transition-all duration-300 ${barBg}`}
            />
          );
        })}
      </div>
    </div>
  );
}
