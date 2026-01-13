import clsx from "clsx";

/**
 * Difficulty Badge
 * Variants: easy | medium | hard
 */
const Badge = ({ level }) => {
  const styles = {
    easy: "bg-green-500/10 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    hard: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
        styles[level] || "border-zinc-700 text-zinc-400"
      )}
    >
      {level}
    </span>
  );
};

export default Badge;
