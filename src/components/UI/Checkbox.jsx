import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

export default function CheckboxComponent() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox
      isSelected={isSelected}
      onValueChange={setIsSelected}
      size="sm"
      color="danger"
    ></Checkbox>
  );
}
