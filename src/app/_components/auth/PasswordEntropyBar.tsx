"use client";

interface PasswordEntropyBarProps {
  password: string;
}

export function PasswordEntropyBar({ password }: PasswordEntropyBarProps) {
  const getScore = (pwd: string): number => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const score = getScore(password);

  const getLabel = () => {
    switch (score) {
      case 0:
        return { text: "Entropy Pending", color: "text-on-surface-variant" };
      case 1:
        return { text: "Low Entropy", color: "text-rose-400" };
      case 2:
        return { text: "Moderate Strength", color: "text-amber-400" };
      case 3:
        return { text: "Strong Passphrase", color: "text-purple-300" };
      case 4:
        return { text: "Strong (Cryptographic Node Ready)", color: "text-primary" };
      default:
        return { text: "Entropy Pending", color: "text-on-surface-variant" };
    }
  };

  const label = getLabel();

  return (
    <div className="space-y-1.5 pt-0.5">
      <div className="flex justify-between items-center text-[11px] font-headline">
        <span className="text-on-surface-variant font-medium">
          Quantum Entropy Strength
        </span>
        <span className={`font-semibold ${label.color}`}>{label.text}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((step) => {
          const isActive = score >= step;
          let barClasses = "bg-white/10";

          if (isActive) {
            if (score === 1) barClasses = "bg-rose-500 shadow-[0_0_8px_#f43f5e]";
            else if (score === 2) barClasses = "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
            else barClasses = "bg-purple-500 shadow-[0_0_8px_#a855f7]";
          }

          return (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${barClasses}`}
            />
          );
        })}
      </div>
    </div>
  );
}
