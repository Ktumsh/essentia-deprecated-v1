import { Switch } from "@nextui-org/switch";
import { Tooltip } from "@nextui-org/tooltip";
import { HospitalIcon } from "./Icons/Hospital";
import { PharmacyIcon } from "./Icons/Pharmacy";

export default function CenterSwitch({
  isSelected,
  setIsSelected,
  onSwitchChange,
}) {
  const handleSwitchChange = (selected) => {
    setIsSelected(selected);
    onSwitchChange(selected);
  };

  return (
    <Tooltip
      className="bg-white dark:bg-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h"
      content={
        isSelected
          ? "Buscar farmacias cercanas"
          : "Buscar centros de salud cercanos"
      }
      placement="top-start"
      delay={1000}
      closeDelay={0}
    >
      <div className="flex flex-col gap-2 bg-base">
        <Switch
          size="lg"
          isSelected={isSelected}
          onValueChange={handleSwitchChange}
          thumbIcon={isSelected ? <HospitalIcon /> : <PharmacyIcon />}
          className="flex flex-col justify-center sm:flex-row z-10 gap-2 sm:gap-0"
          classNames={{
            label:
              "text-xs sm:text-base text-base-color dark:text-base-color-dark",
            wrapper:
              "group-data-[selected=true]:bg-white bg-white dark:group-data-[selected=true]:bg-base-full-dark dark:bg-base-full-dark shadow-small mr-0 sm:mr-2",
            thumb: "bg-bittersweet-400 dark:bg-cerise-red-600",
            thumbIcon: "text-white",
          }}
        >
          <span className="hidden sm:block">
            {isSelected ? "Centros de salud" : "Farmacias"}
          </span>
          <span className="sm:hidden block self-start w-full">
            {isSelected ? "Centros" : "Farmacias"}
          </span>
        </Switch>
      </div>
    </Tooltip>
  );
}
