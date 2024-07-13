import { useState, useRef } from "react";
import ExcerciseIcon from "@/icons/react/Exercise";
import ForAllAgesIcon from "@/icons/react/ForAllAges";
import HealthIcon from "@/icons/react/Health";
import NutritionIcon from "@/icons/react/Nutrition";
import SexualityIcon from "@/icons/react/Sexuality";
import WellbeingIcon from "@/icons/react/Wellbeing";

const Navbar = ({ pages }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const navLinks = [
    {
      name: "Salud y bienestar",
      link: "/recursos/salud-y-bienestar",
      icon: HealthIcon,
    },
    {
      name: "Ejercicios y fitness",
      link: "/recursos/ejercicios-y-fitness",
      icon: ExcerciseIcon,
    },
    {
      name: "Nutrición y alimentación",
      link: "/recursos/nutricion-y-alimentacion",
      icon: NutritionIcon,
    },
    {
      name: "Bienestar emocional",
      link: "/recursos/bienestar-emocional",
      icon: WellbeingIcon,
    },
    {
      name: "Salud y educación sexual",
      link: "/recursos/salud-y-educacion-sexual",
      icon: SexualityIcon,
    },
    {
      name: "Salud para todas las edades",
      link: "/recursos/salud-para-todas-las-edades",
      icon: ForAllAgesIcon,
    },
  ];

  return (
    <>
      {pages.map(({ name, href, active }, key) => (
        <div
          key={key}
          className="relative"
          onMouseEnter={key === 0 ? handleMouseEnter : null}
          onMouseLeave={key === 0 ? handleMouseLeave : null}
        >
          <a
            id={`navbar_link_${key + 1}`}
            className="relative min-w-[20%] size-auto px-3 pointer-events-auto navbar_link"
            href={href}
          >
            <span
              className={[
                "relative pb-1 text-center pointer-events-auto hover:text-bittersweet-400 dark:hover:text-cerise-red-400",
                "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300",
                active
                  ? "current-page text-bittersweet-400 dark:text-cerise-red-400 after:bg-bittersweet-400 dark:after:bg-cerise-red-400 after:scale-x-100"
                  : "not-current",
              ].join(" ")}
            >
              {name}
            </span>
          </a>
          {name === "Recursos" && (
            <div
              aria-label="Dropdown Menú"
              data-open={isMenuOpen}
              className={`absolute top-10 left-0 will-change-auto origin-top-left transition-transform-opacity duration-200 delay-500 z-50 ${
                isMenuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-90 pointer-events-none !duration-150 delay-0"
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="z-10 inline-flex flex-col items-center justify-center subpixel-antialiased outline-none box-border text-small bg-content1 shadow-medium w-full min-w-[200px] p-1 bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl">
                <div className="w-full relative flex flex-col gap-1 p-1">
                  <div className="w-full flex flex-col gap-0.5">
                    {navLinks.map(({ name, link, icon: Icon }, index) => (
                      <a
                        key={index}
                        className="flex group gap-2 items-center justify-between px-2 py-1.5 size-full focus:bg-gray-200 dark:focus:bg-base-dark rounded-xl hover:bg-gray-200 dark:hover:bg-base-dark text-base-color-h dark:text-base-color-dark-m hover:text-base-color-h dark:hover:text-base-color-dark transition-colors duration-150"
                        href={link}
                      >
                        <Icon className="size-4" />
                        <span className="flex-1 truncate">{name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Navbar;
