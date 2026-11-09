
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useTheme() {
  const [theme, setTheme] = useLocalStorage("cg-theme", "dark");

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark"
  };
}

export default useTheme;
