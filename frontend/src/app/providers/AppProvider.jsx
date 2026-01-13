import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getToken,
  getCurrentUser,
  logout as clearAuth,
} from "../../services/auth.service";

/**
 * Global App Context
 * Handles:
 * - global loading
 * - auth state
 * - user state (required for navbar, profile, progress)
 */
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  /* ------------------
     Global loading
  ------------------- */
  const [loading, setLoading] = useState(false);

  /* ------------------
     Auth + User state
  ------------------- */
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Restore auth on app load
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      setUser(getCurrentUser());

      // 🔥 hydrate progress from backend
      import("../../services/progress.service").then(
        ({ hydrateProgressFromBackend }) => {
          hydrateProgressFromBackend();
        }
      );
    }
    setAuthReady(true);
  }, []);

  /* ------------------
     Auth actions
  ------------------- */
  const login = (authData) => {
    setToken(authData.token);
    setUser(authData.user);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const value = {
    /* loading */
    loading,
    setLoading,

    /* auth */
    token,
    user,
    setUser,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {authReady && children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook for accessing app context
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
};
