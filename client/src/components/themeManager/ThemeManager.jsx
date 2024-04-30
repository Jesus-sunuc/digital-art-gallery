import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ThemeManager({ setDarkMode }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const theme = query.get("theme");
    if (theme) {
      setDarkMode(theme === "dark");
    }
  }, [query, setDarkMode]);

  return null;
}

export default ThemeManager;
