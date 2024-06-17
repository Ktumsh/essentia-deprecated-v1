import { useState, useEffect } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { Tooltip } from "@nextui-org/tooltip";

export function ThemeToggle({
  buttonClass = "dark:bg-base-full-dark",
  spanClass = "dark:bg-base-dark",
}) {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Tooltip
      className="dark:bg-white bg-base-full-dark text-xs dark:text-base-color-h text-base-color-dark-h"
      content={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
      delay={500}
      closeDelay={0}
    >
      <button
        type="button"
        className={`group btn__mode relative inline-flex flex-shrink-0 items-center justify-start w-14 h-8 px-1 text-base-color-h dark:text-gray-400 bg-gray-200 rounded-full overflow-hidden cursor-pointer ${
          theme === "dark" ? "darkmode" : ""
        } ${buttonClass}`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon
          className={`${
            theme === "light"
              ? "z-0 absolute left-1.5 rtl:right-1.5 rtl:left-[unset] text-current text-medium opacity-100 scale-100 transition-transform-opacity"
              : "z-0 absolute left-1.5 rtl:right-1.5 rtl:left-[unset] text-current text-medium opacity-0 scale-50 transition-transform-opacity"
          }`}
        />
        <span
          className={`btn__indicator flex justify-center items-center size-6 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,.2)] dark:shadow-[0_2px_10px_rgba(0,_0,_0,_0.3)] transition-[margin,_width] z-10 group-active:w-7 ${
            theme === "dark"
              ? "mr-6 group-active:mr-5"
              : "ml-6 group-active:ml-5"
          } ${spanClass}`}
        ></span>
        <MoonIcon
          className={`${
            theme === "dark"
              ? "z-0 absolute right-1.5 rtl:left-1.5 rtl:right-[unset] text-medium opacity-100 transition-transform-opacity"
              : "z-0 absolute right-1.5 rtl:left-1.5 rtl:right-[unset] text-medium opacity-0 translate-x-3 transition-transform-opacity"
          }`}
        />
      </button>
    </Tooltip>
  );
}
