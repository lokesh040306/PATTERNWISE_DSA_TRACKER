const PatternSelector = ({
  patterns,
  selected,
  onChange,
}) => {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((p) => p !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {patterns.map((p) => (
        <label
          key={p._id}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-800 p-3 text-sm text-zinc-300"
        >
          <input
            type="checkbox"
            checked={selected.includes(p._id)}
            onChange={() => toggle(p._id)}
          />
          {p.name}
        </label>
      ))}
    </div>
  );
};

export default PatternSelector;
