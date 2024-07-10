import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { StarIcon } from "@/components/Additionals/Icons/Star";

export default function ChipBadge() {
  return (
    <Tooltip
      className="bg-gradient-to-br from-white to-default-200 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h"
      content="Contenido recomendado"
      delay={500}
      closeDelay={0}
    >
      <Chip
        variant="shadow"
        classNames={{
          base: "w-12 max-w-full justify-center bg-light-gradient dark:bg-dark-gradient-v2 cursor-help",
          content: "flex justify-center",
        }}
      >
        <StarIcon className="w-4 text-white" />
      </Chip>
    </Tooltip>
  );
}
