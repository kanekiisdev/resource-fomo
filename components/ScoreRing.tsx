interface ScoreRingProps {
  score: number; // 0-100
  size?: number;
}

function scoreColor(score: number): string {
  if (score >= 80) return "#10B981"; // emerald
  if (score >= 60) return "#3B82F6"; // blue
  if (score >= 40) return "#F59E0B"; // amber
  return "#EF4444"; // red
}

export function ScoreRing({ score, size = 88 }: ScoreRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#21262D"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-xl font-semibold" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-muted -mt-0.5">/ 100</span>
      </div>
    </div>
  );
}
