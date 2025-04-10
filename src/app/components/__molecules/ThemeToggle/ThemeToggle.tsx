"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="your-existing-classes flex items-center justify-center"
    >
      <i
        className="icon"
        style={{
          backgroundImage:
            'url("https://static.xx.fbcdn.net/rsrc.php/v4/ye/r/BLWcLnvjOkk.png")',
          backgroundPosition: "0px -386px",
          backgroundSize: "auto",
          width: "20px",
          height: "20px",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
        }}
      />
    </button>
  );
}
