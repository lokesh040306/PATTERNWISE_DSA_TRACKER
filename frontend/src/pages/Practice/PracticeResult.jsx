import Badge from "../../components/ui/Badge";

const PracticeResult = ({ problems }) => {
  if (!problems.length) return null;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Your Practice Set
      </h2>

      {problems.map((p, index) => (
        <div
          key={p._id}
          className="flex items-start justify-between gap-4 rounded-md border border-zinc-800 bg-zinc-950 p-4"
        >
          {/* Left */}
          <div>
            <p className="font-medium text-white">
              {index + 1}. {p.title}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Pattern:{" "}
              <span className="text-zinc-400">
                {p.patternName || "—"}
              </span>
            </p>

            <div className="mt-2">
              <Badge level={p.difficulty} />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-2 text-sm">
            {p.leetcodeLink && (
              <a
                href={p.leetcodeLink}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline"
              >
                LeetCode
              </a>
            )}
            {p.gfgLink && (
              <a
                href={p.gfgLink}
                target="_blank"
                rel="noreferrer"
                className="text-green-400 hover:underline"
              >
                GFG
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PracticeResult;
