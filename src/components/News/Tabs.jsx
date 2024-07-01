import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";

export default function NewsTabs() {
  const [selected, setSelected] = useState("todo");

  // Restaurar el estado desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      setSelected(savedTab);
    }
  }, []);

  // Guardar el estado en localStorage cuando cambia
  const handleSelectionChange = (key) => {
    setSelected(key);
    localStorage.setItem("selectedTab", key);
  };

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
      classNames={{
        tabList: "relative w-full bg-transparent",
        tab: "max-w-fit",
        cursor: "bg-white dark:bg-cerise-red-600/50 shadow-small rounded-lg",
        tabContent:
          "text-base-color-h dark:text-base-color-dark-h group-data-[selected=true]:text-base-color dark:group-data-[selected=true]:text-base-color-dark",
        panel: "px-0 py-5",
      }}
    >
      <Tab key="todo" title="Todo"></Tab>
      <Tab key="internacional" title="Internacional"></Tab>
      <Tab key="nacional" title="Nacional"></Tab>
    </Tabs>
  );
}
