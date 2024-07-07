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
    intro: `Encuentra una amplia variedad de consejos sobre <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">hábitos saludables</strong> hasta métodos para <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">potenciar tu salud mental y emocional</strong>, encontrarás recursos variados para impulsar tu bienestar en todos los aspectos de la vida...`,
    quote:
      "El mayor tesoro es la salud, y el conocimiento es la llave para preservarla.",
    image: "/extras/salud-600x400.webp",
    imageFull: "/extras/salud-1920x1280.webp",
    background: "bg-resource-1",
    resource: "salud-y-bienestar",
    component: HealthWellness,
    span: "md:col-span-4",
  },
  {
    id: 2,
    title: "Ejercicios y Fitness",
    intro: `Aprende a abordar nuevos deportes, <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">trabajar en tu propio físico</strong> y llevar una vida más activa, adaptada a tus necesidades. Mejorarás tu rendimiento en las actividades diarias y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">te sentirás más enérgico</strong>...`,
    quote:
      "El movimiento es una medicina para crear el cambio físico, emocional y mental.",
    image: "/extras/ejercicio-600x400.webp",
    imageFull: "/extras/ejercicio-1920x1280.webp",
    background: "bg-resource-2",
    resource: "ejercicios-y-fitness",
    component: ExerciseFitness,
    span: "md:col-span-5",
  },
  {
    id: 3,
    title: "Nutrición y Alimentación",
    intro: `Te brindamos soluciones para una <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">alimentación equilibrada</strong> que te permitirán alcanzar tus objetivos, promoviendo un estilo de vida más <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">saludable y sostenible</strong> a largo plazo...`,
    quote: "Que tu alimento sea tu medicina y que tu medicina sea tu alimento.",
    image: "/extras/nutricion-600x400.webp",
    imageFull: "/extras/nutricion-1920x1280.webp",
    background: "bg-resource-3",
    resource: "nutricion-y-alimentacion",
    component: Nutrition,
    span: "md:col-span-3",
  },
  {
    id: 4,
    title: "Bienestar Emocional",
    intro: `En esta sección encontrarás consejos, métodos para <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">manejar el estrés</strong> y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">mejorar la salud mental</strong>, promoviendo así la armonía emocional en tu día a día...`,
    quote:
      "La paz interior comienza en el momento en que eliges no permitir que otra persona o evento controle tus emociones.",
    image: "/extras/bienestar-600x400.webp",
    imageFull: "/extras/bienestar-1920x1280.webp",
    background: "bg-resource-4",
    resource: "bienestar-emocional",
    component: Wellbeing,
    span: "md:col-span-3",
  },
  {
    id: 5,
    title: "Salud y Educación Sexual",
    intro: `Proveemos información y recursos educativos sobre sexualidad, incluyendo métodos anticonceptivos y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">consejos de cuidado</strong>, para fomentar el entendimiento y <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">cuidado de la diversidad y salud sexual</strong>...`,
    quote:
      "La educación es el arma más poderosa para cambiar el mundo, incluida nuestra comprensión de la salud sexual.",
    image: "/extras/sexualidad-600x400.webp",
    imageFull: "/extras/sexualidad-1920x1280.webp",
    background: "bg-resource-5",
    resource: "salud-y-educacion-sexual",
    component: SexEducation,
    span: "md:col-span-4",
  },
  {
    id: 6,
    title: "Salud para Todas las Edades",
    intro: `Desde la infancia hasta la vejez, nuestra sección <strong class="text-cerise-red-800 dark:text-cerise-red-300 font-medium">Salud para Todas las Edades</strong> ofrece información relevante y específica para cada etapa de la vida. Encuentra consejos útiles y recursos para cuidar la salud en todas las etapas del desarrollo...`,
    quote:
      "La salud es un regalo, y mantenerla es una de las mayores recompensas que podemos dar a nosotros mismos en cada etapa de la vida.",
    image: "/extras/edades-600x400.webp",
    imageFull: "/extras/edades-1920x1280.webp",
    background: "bg-resource-6",
    resource: "salud-para-todas-las-edades",
    component: ForAllAges,
    span: "md:col-span-5",
  },
];
