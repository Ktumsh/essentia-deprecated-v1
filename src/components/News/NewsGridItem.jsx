/*
import { ClockIcon } from "./Clock";
import { EyeIcon } from "./Eye";
import "./fadein.css";

const translateCategory = (categories) => {
  if (categories) {
    const category = categories; // Extraer la primera categoría del array
    if (category === "health") {
      const translations = ["salud", "bienestar"];
      return translations[Math.floor(Math.random() * translations.length)];
    }
    return category;
  }
  return "sin categoría"; // Valor predeterminado si no hay categorías
};

const NewsGridItem = ({
  className,
  category,
  title,
  source_icon,
  creator,
  pubDate,
  views,
  link,
  image_url,
}) => {
  const formatDate = (apiDate) => {
    if (!apiDate) return "";
    const date = new Date(apiDate);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formattedDate = formatDate(pubDate);
  const translatedCategory = translateCategory(category);

  return (
    <a
      href={link}
      className={`
        ${className}
        group fadein
        relative flex flex-col 
        items-center justify-end 
        h-96 rounded-xl shadow-md 
        dark:shadow-none overflow-hidden`}
    >
      <img
        className="absolute inset-0 size-full object-cover dark:[mask-image:linear-gradient(rgba(0,_0,_0,_1)_0%,_transparent_90%)] group-hover:scale-105 transition"
        src={image_url}
        alt=""
      />
      <div className="absolute inset-0 size-full bg-cover bg-center bg-[linear-gradient(to_top,_rgba(0,_0,_0,_0.95)_0%,_transparent_100%)] dark:bg-none"></div>
      <div className="flex flex-col w-full content-center p-6 lg:p-10">
        <div className="flex flex-col items-start justify-start w-full mb-6 sm:mb-8 gap-2 text-white/80 z-10">
          <span className="text-white/80 text-[10px] sm:text-xs uppercase px-3 sm:py-1 bg-bittersweet-500/40 dark:bg-cerise-red-600/40 backdrop-blur backdrop-saturate-150 border border-bittersweet-400/30 dark:border-cerise-red-600/30 overflow-hidden rounded-full shadow-md">
            {translatedCategory}
          </span>
          <h4 className="font-medium text-lg sm:text-xl lg:text-2xl group-hover:text-white text-ellipsis line-clamp-3 transition">
            {title}
          </h4>
        </div>
        <div className="flex flex-row items-center w-full gap-5 text-base-color-dark z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 h-full w-full">
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <img className="size-6 rounded-full" src={source_icon} alt="" />
              <span className="text-xs text-nowrap">{creator}</span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <ClockIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{formattedDate}</span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <EyeIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{views}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsGridItem;
*/

import { ClockIcon } from "./Clock";
import { EyeIcon } from "./Eye";
import "./fadein.css";

const translateCategory = (categories) => {
  if (categories) {
    const category = categories; // Extraer la primera categoría del array
    if (category === "health") {
      const translations = ["salud", "bienestar"];
      return translations[Math.floor(Math.random() * translations.length)];
    }
    return category;
  }
  return "sin categoría"; // Valor predeterminado si no hay categorías
};

const NewsGridItem = ({
  className,
  category,
  title,
  imageAuthor,
  author,
  date,
  views,
  url,
  image,
}) => {
  function formatDate(apiDate) {
    const defaultDate = "01 jun 2024";
    if (!apiDate) return defaultDate;
    const date = new Date(apiDate);

    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const parts = formattedDate.split(" ");
    if (parts.length >= 3) {
      const day = parts[0];
      const month = parts[2];
      const year = parts[4] || parts[2];
      const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
      return `${day} de ${monthCapitalized}, ${year}`;
    }
    return formattedDate;
  }

  const formattedDate = formatDate(date);
  const translatedCategory = translateCategory(category);

  return (
    <a
      href={url}
      className={`
        ${className}
        group fadein
        relative flex flex-col 
        items-center justify-end 
        h-96 rounded-xl shadow-md 
        dark:shadow-none overflow-hidden`}
    >
      <img
        className="absolute inset-0 size-full object-cover dark:[mask-image:linear-gradient(rgba(0,_0,_0,_1)_0%,_transparent_90%)] group-hover:scale-105 transition"
        src={image}
        alt=""
      />
      <div className="absolute inset-0 size-full bg-cover bg-center bg-[linear-gradient(to_top,_rgba(0,_0,_0,_0.95)_0%,_transparent_100%)] dark:bg-none"></div>
      <div className="flex flex-col w-full content-center p-6 lg:p-10">
        <div className="flex flex-col items-start justify-start w-full mb-6 sm:mb-8 gap-2 text-white/80 z-10">
          <span className="text-white/80 text-[10px] sm:text-xs uppercase px-3 sm:py-1 bg-bittersweet-500/40 dark:bg-cerise-red-600/40 backdrop-blur backdrop-saturate-150 border border-bittersweet-400/30 dark:border-cerise-red-600/30 overflow-hidden rounded-full shadow-md">
            {translatedCategory}
          </span>
          <h4 className="font-medium text-lg sm:text-xl lg:text-2xl group-hover:text-white text-ellipsis line-clamp-3 transition">
            {title}
          </h4>
        </div>
        <div className="flex flex-row items-center w-full gap-5 text-base-color-dark z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 h-full w-full">
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <img className="size-6 rounded-full" src={imageAuthor} alt="" />
              <span className="text-xs text-nowrap">{author}</span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <ClockIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{formattedDate}</span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <EyeIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{views}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsGridItem;

/*
import { ClockIcon } from "./Clock";
import { EyeIcon } from "./Eye";
import "./fadein.css";

const translateCategory = (categories) => {
  if (Array.isArray(categories) && categories.length > 0) {
    const category = categories[0]; // Extraer la primera categoría del array
    if (category === "health") {
      const translations = ["salud", "bienestar"];
      return translations[Math.floor(Math.random() * translations.length)];
    }
    return category;
  }
  return "sin categoría"; // Valor predeterminado si no hay categorías
};

const NewsGridItem = ({
  className,
  category,
  title,
  source_icon,
  creator,
  pubDate,
  views,
  link,
  image_url,
}) => {
  const formatDate = (apiDate) => {
    if (!apiDate) return "";
    const date = new Date(apiDate);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formattedDate = formatDate(pubDate);
  const translatedCategory = translateCategory(category);

  console.log(translateCategory(category));

  return (
    <a
      href={link}
      className={`
        ${className}
        group fadein
        relative flex flex-col 
        items-center justify-end 
        h-96 rounded-xl shadow-md 
        dark:shadow-none overflow-hidden`}
    >
      <img
        className="absolute inset-0 size-full object-cover dark:[mask-image:linear-gradient(rgba(0,_0,_0,_1)_0%,_transparent_90%)] group-hover:scale-105 transition"
        src={image_url || "/extras/news-concept.webp"}
        alt=""
      />
      <div className="absolute inset-0 size-full bg-cover bg-center bg-[linear-gradient(to_top,_rgba(0,_0,_0,_0.95)_0%,_transparent_100%)] dark:bg-none"></div>
      <div className="flex flex-col w-full content-center p-6 lg:p-10">
        <div className="flex flex-col items-start justify-start w-full mb-6 sm:mb-8 gap-2 text-white/80 z-10">
          <span className="text-white/80 text-[10px] sm:text-xs uppercase px-3 sm:py-1 bg-bittersweet-500/40 dark:bg-cerise-red-600/40 backdrop-blur backdrop-saturate-150 border border-bittersweet-400/30 dark:border-cerise-red-600/30 overflow-hidden rounded-full shadow-md">
            {translatedCategory}
          </span>
          <h4 className="font-medium text-lg sm:text-xl lg:text-2xl group-hover:text-white text-ellipsis line-clamp-3 transition">
            {title}
          </h4>
        </div>
        <div className="flex flex-row items-center w-full gap-5 text-base-color-dark z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 h-full w-full">
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <img className="size-6 rounded-full" src={source_icon} alt="" />
              <span className="text-xs text-nowrap">
                {creator || "Desconocido"}
              </span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <ClockIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{formattedDate}</span>
            </div>
            <div className="flex flex-row items-center justify-center h-full gap-2">
              <EyeIcon
                width="14"
                height="14"
                className="text-bittersweet-400 dark:text-cerise-red-500"
              />
              <span className="text-xs text-nowrap">{views}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsGridItem;
*/
