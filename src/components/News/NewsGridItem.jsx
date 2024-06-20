import { ClockIcon } from "./Clock";
import { EyeIcon } from "./Eye";
import "./fadein.css";

const NewsGridItem = ({
  className,
  topic,
  title,
  imageAuthor,
  author,
  date,
  views,
  url,
  image,
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

  const formattedDate = formatDate(date);

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
            {topic}
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
