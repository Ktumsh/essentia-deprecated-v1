import { BackIcon } from "@/icons/react/Back";
import ExcerciseIcon from "@/icons/react/Exercise";
import ForAllAgesIcon from "@/icons/react/ForAllAges";
import HealthIcon from "@/icons/react/Health";
import NutritionIcon from "@/icons/react/Nutrition";
import SexualityIcon from "@/icons/react/Sexuality";
import WellbeingIcon from "@/icons/react/Wellbeing";
import { Button } from "@nextui-org/button";

const ResourceTabs = () => {
  const asideLinks = [
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
      name: "Nutrición",
      link: "/recursos/nutricion",
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
    <aside className="absolute top-0 left-0 flex flex-grow justify-end mt-5">
      <div className="flex h-full w-fit bg-gradient-to-br from-white to-default-200 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-e-xl shadow-md">
        <div className="flex flex-col items-center justify-between size-full p-2 pb-0">
          <div className="flex items-center gap-5 w-full mb-2 px-3 py-2 rounded-xl bg-gray-200 dark:bg-base-full-dark">
            <a href="/recursos" className="h-10">
              <Button variant="flat" color="danger" isIconOnly>
                <BackIcon />
              </Button>
            </a>
            <h3 className="text-xl font-bold uppercase">Recursos</h3>
          </div>
          <div className="flex flex-col w-full">
            <ul>
              {asideLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link}>
                    <Button
                      disableRipple
                      fullWidth
                      size="lg"
                      radius="lg"
                      variant="light"
                      startContent={
                        <link.icon className="size-7 text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white" />
                      }
                      className="h-[50px] justify-start text-left p-3 mb-2 hover:bg-gray-200 dark:hover:bg-base-full-dark"
                    >
                      <span className="text-lg font-medium mr-4 text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </Button>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResourceTabs;
