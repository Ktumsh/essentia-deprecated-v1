import { useState } from "react";
import { Button } from "@nextui-org/button";
import HomeIcon from "./Icons/Home";
import HomeFillIcon from "./Icons/HomeFill";
import SupportFillIcon from "./Icons/SupportFill";
import SupportIcon from "./Icons/Support";
import StoriesIcon from "./Icons/Stories";
import StoriesFillIcon from "./Icons/StoriesFill";
import ResourcesFillIcon from "./Icons/ResourcesFill";
import ResourcesIcon from "./Icons/Resources";
import GoBackIcon from "./Icons/GoBack";
import ProfileDropdown from "./ProfileDropdown";

const Header = ({ setActiveSection, session }) => {
  const [active, setActive] = useState("blog");

  const handleButtonClick = (section) => {
    setActive(section);
    setActiveSection(section);
  };

  const getFirstNameAndLastName = (fullName) => {
    if (!fullName) return "Usuario";
    const nameParts = fullName.toLowerCase().split(" ");
    if (nameParts.length < 3) return capitalize(fullName);
    return `${capitalize(nameParts[0])} ${capitalize(
      nameParts[nameParts.length - 2]
    )}`;
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const hasUsername = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;
  const profileAvatar = session?.user?.image;

  const headerLinks = [
    {
      name: "Inicio",
      icon: HomeIcon,
      iconFill: HomeFillIcon,
      for: "blog",
    },
    {
      name: "Grupos de apoyo",
      icon: SupportIcon,
      iconFill: SupportFillIcon,
      for: "support-groups",
    },
    {
      name: "Historias inspiradoras",
      icon: StoriesIcon,
      iconFill: StoriesFillIcon,
      for: "inspiring-stories",
    },
    {
      name: "Recursos comunitarios",
      icon: ResourcesIcon,
      iconFill: ResourcesFillIcon,
      for: "community-resources",
    },
  ];

  return (
    <header className="relative flex flex-grow sm:w-2/12 md:w-1/4 lg:w-auto justify-end">
      <div className="flex size-full justify-end lg:w-[310px]">
        <div className="flex flex-col items-center justify-between lg:p-2">
          <div className="flex flex-col items-center lg:items-stretch">
            <div className="hidden lg:block w-fit h-full p-3 rounded-full">
              <a href="comunidad" className="inline-flex dark:hidden">
                <img
                  width={192}
                  src="/essentia-community-logo-light.png"
                  alt="Essentia Community Logo"
                />
              </a>
              <a href="comunidad" className="dark:inline-flex hidden">
                <img
                  width={192}
                  src="/essentia-community-logo-dark.png"
                  alt="Essentia Community Logo"
                />
              </a>
            </div>
            <div className="lg:hidden w-fit h-full p-3 rounded-full">
              <a href="comunidad" className="inline-flex dark:hidden">
                <img
                  width={28}
                  src="/e-logomark-on-light.webp"
                  alt="Essentia Community Logo"
                />
              </a>
              <a href="comunidad" className="dark:inline-flex hidden">
                <img
                  width={28}
                  src="/e-logomark-on-dark.webp"
                  alt="Essentia Community Logo"
                />
              </a>
            </div>
            <ul>
              {headerLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    size="lg"
                    radius="full"
                    color="danger"
                    variant="light"
                    onClick={() => handleButtonClick(link.for)}
                    startContent={
                      active === link.for ? (
                        <link.iconFill
                          className={`size-7 lg:mr-2 ${
                            active === link.for
                              ? "font-bold text-black dark:text-white"
                              : "font-medium text-base-color dark:text-base-color-dark"
                          }`}
                        />
                      ) : (
                        <link.icon
                          className={`size-7 lg:mr-2 ${
                            active === link.for
                              ? "font-bold text-black dark:text-white"
                              : "font-medium text-base-color dark:text-base-color-dark"
                          }`}
                        />
                      )
                    }
                    className="min-w-fit lg:min-w-24 w-fit h-[50px] justify-start text-left p-3 mb-2"
                  >
                    <span
                      className={`hidden lg:block text-lg mr-4 ${
                        active === link.for
                          ? "font-bold text-black dark:text-white"
                          : "font-medium text-base-color dark:text-base-color-dark"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-stretch w-full">
            <a className="w-fit" href="/recursos">
              <Button
                size="lg"
                radius="full"
                color="danger"
                variant="light"
                startContent={
                  <GoBackIcon className="size-6 lg:mr-2 text-bittersweet-400 dark:text-cerise-red-300" />
                }
                className="min-w-fit lg:min-w-24 w-fit h-[50px] p-3 mb-2"
              >
                <span className="hidden lg:block mr-4 justify-start text-left text-bittersweet-400 dark:text-cerise-red-300">
                  Volver a Essentia
                </span>
              </Button>
            </a>
            <ProfileDropdown
              name={normalizeName}
              username={hasUsername}
              avatar={profileAvatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
