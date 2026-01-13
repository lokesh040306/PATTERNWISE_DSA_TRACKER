import { useEffect, useState } from "react";

/**
 * Generic fetch hook
 * - Stable
 * - Dependency-driven
 * - Safe for multiple parallel requests
 */
const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        if (active) setData(result);
      } catch (err) {
        if (active)
          setError(err?.message || "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
};

export default useFetch;
