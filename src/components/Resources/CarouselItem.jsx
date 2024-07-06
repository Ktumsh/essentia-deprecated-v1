import ArrowRight from "@/icons/react/ArrowRight";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

const RecomCarouselItem = ({
  id,
  title,
  description,
  textBtn,
  url,
  image,
  isActive,
}) => {
  return (
    <div
      id={id}
      className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      data-carousel-item={isActive ? "active" : ""}
    >
      <div className="absolute inset-0 z-30">
        <div className="flex flex-col items-center sm:items-start justify-center h-full py-8 sm:py-16 px-14 sm:px-24 sm:pr-56 md:pr-80 w-full text-start bg-[radial-gradient(rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.2)_100%)] sm:bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0)_100%)]">
          <h1 className="mb-4 text-center sm:text-start text-xl font-medium tracking-tight leading-none text-white md:text-2xl lg:text-4xl dark:text-white">
            {title}
          </h1>
          <p className="hidden sm:block mb-8 sm:text-base text-lg font-normal text-gray-200">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center">
            <a href={url} className="">
              <Button
                variant="shadow"
                size="md"
                color="danger"
                className="group"
              >
                {textBtn}
                <ArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180 group-hover:translate-x-2 group-hover:mr-2 transition-[margin,transform]" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      <Image
        src={image}
        alt={title}
        classNames={{
          wrapper: "static",
          img: "absolute block size-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
        }}
      />
    </div>
  );
};

export default RecomCarouselItem;
