import { Link } from "react-router-dom";

/**
 * Single Pattern Card
 * - Progress-ready (safe, backend-compatible)
 * - UI polished (calm, professional, non-flashy)
 */
const PatternCard = ({ pattern }) => {
  const completed = pattern.completedCount;
  const total = pattern.totalCount;

  const showProgress =
    typeof completed === "number" &&
    typeof total === "number" &&
    total > 0;

  const percentage = showProgress
    ? Math.round((completed / total) * 100)
    : 0;

  return (
    <Link
      to={`/patterns/${pattern._id}`}
      className="group flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:border-primary/60 hover:bg-zinc-900/80"
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-zinc-100 transition group-hover:text-primary">
          {pattern.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-3">
          {pattern.description}
        </p>
      </div>

      {/* Progress */}
      {showProgress && (
        <div className="mt-5">
          <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
            <span>Progress</span>
            <span className="font-medium text-zinc-400">
              {completed} / {total}
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-5 text-xs font-medium text-zinc-500 transition group-hover:text-primary/80">
        Explore pattern →
      </div>
    </Link>
  );
};

export default PatternCard;
