import { useSelector } from "react-redux";

/**
 * 
 * @param {string[]} keys - Ej: ["popular", "upcoming"]
 */
export function useLoading(keys = []) {
    return useSelector((state) =>
        keys.some((key) => state.movies.status?.[key] === "loading")
    );
}


export function useError(keys = []) {
  return useSelector((state) => {
    const status = state.movies.status || {};
    return keys.some((key) => status[key] === "failed");
  });
}
