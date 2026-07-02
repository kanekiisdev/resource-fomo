import type { ScoredResource } from "@/types/resource";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { ScoreRing } from "./ScoreRing";
import { Button } from "./ui/Button";

interface ResourceCardProps {
  scored: ScoredResource;
  rank?: number;
}

export function ResourceCard({ scored, rank }: ResourceCardProps) {
  const { resource, score, breakdown } = scored;

  return (
    <Card className="animate-slideUp">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {rank && (
              <span className="font-mono text-xs text-muted">#{rank}</span>
            )}
            <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge color="blue">{resource.difficulty}</Badge>
            <Badge color="neutral">{resource.teachingStyle}</Badge>
            <Badge color="neutral">{resource.language}</Badge>
            <Badge color="neutral">{resource.durationHours}h</Badge>
          </div>
        </div>
        <ScoreRing score={score} size={72} />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted text-xs uppercase tracking-wide mb-1">Strengths</p>
          <ul className="space-y-0.5">
            {resource.strengths.slice(0, 2).map((s) => (
              <li key={s} className="text-foreground/90">
                <span className="text-accent-emerald">+</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-muted text-xs uppercase tracking-wide mb-1">Weaknesses</p>
          <ul className="space-y-0.5">
            {resource.weaknesses.slice(0, 2).map((w) => (
              <li key={w} className="text-foreground/90">
                <span className="text-accent-red">–</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="mt-4 group">
        <summary className="cursor-pointer text-xs text-muted hover:text-foreground transition-colors list-none flex items-center gap-1">
          <span className="group-open:rotate-90 transition-transform inline-block">▸</span>
          Why this score?
        </summary>
        <div className="mt-2 space-y-1.5 border-l border-border pl-3">
          {breakdown.map((b) => (
            <div key={b.field} className="text-xs flex items-start gap-2">
              <span className={b.matched ? "text-accent-emerald" : "text-muted"}>
                {b.matched ? "✓" : "○"}
              </span>
              <span className="text-foreground/80">
                <span className="font-medium">{b.label}:</span> {b.note}
              </span>
            </div>
          ))}
        </div>
      </details>

      <div className="mt-4 flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => window.open(resource.link, "_blank")}
        >
          Start Learning
        </Button>
        <Button variant="secondary" size="sm">
          Compare
        </Button>
      </div>
    </Card>
  );
}
