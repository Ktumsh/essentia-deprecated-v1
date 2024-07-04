import ExerciseFitness from "@/components/Resources/ExerciseFitness.astro";
import ForAllAges from "@/components/Resources/ForAllAges.astro";
import HealthWellness from "@/components/Resources/HealthWellness.astro";
import Nutrition from "@/components/Resources/Nutrition.astro";
import SexEducation from "@/components/Resources/SexEducation.astro";
import Wellbeing from "@/components/Resources/Wellbeing.astro";
import type { Resources } from "@/types/Resources";

export const RESOURCES: Resources[] = [
  {
    id: 1,
    title: "Salud y Bienestar",
    resource: "salud-y-bienestar",
    component: HealthWellness,
    background: "bg-resource-1",
  },
  {
    id: 2,
    title: "Ejercicios y Fitness",
    resource: "ejercicios-y-fitness",
    component: ExerciseFitness,
    background: "bg-resource-2",
  },
  {
    id: 3,
    title: "Nutrición",
    resource: "nutricion",
    component: Nutrition,
    background: "bg-resource-3",
  },
  {
    id: 4,
    title: "Bienestar Emocional",
    resource: "bienestar-emocional",
    component: Wellbeing,
    background: "bg-resource-4",
  },
  {
    id: 5,
    title: "Salud y Educación Sexual",
    resource: "salud-y-educacion-sexual",
    component: SexEducation,
    background: "bg-resource-5",
  },
  {
    id: 6,
    title: "Salud para Todas las Edades",
    resource: "salud-para-todas-las-edades",
    component: ForAllAges,
    background: "bg-resource-6",
  },
];
