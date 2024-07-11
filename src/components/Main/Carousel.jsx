import { useState, useEffect, useRef } from "react";
import RecomCarouselItem from "./CarouselItem";
import { MAINCAP_RESOURCES } from "@/consts/recom-carousel";
import { CarouselArrowIcon } from "@/icons/react/CarouselArrow";
import { Button } from "@nextui-org/button";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemList = MAINCAP_RESOURCES.slice(0, 5);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoChange();
    return () => stopAutoChange();
  }, [itemList.length]);

  const startAutoChange = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemList.length);
    }, 8000);
  };

  const stopAutoChange = () => {
    clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + itemList.length) % itemList.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemList.length);
  };

  return (
    <div
      id="recom_carousel"
      className="relative w-full"
      onMouseEnter={stopAutoChange}
      onMouseLeave={startAutoChange}
    >
      <div className="relative h-56 overflow-hidden lg:rounded-xl shadow-md border border-gray-100/50 dark:border-none md:h-96">
        {itemList.map((item, index) => (
          <RecomCarouselItem
            key={index}
            id={`carousel-item-${index + 1}`}
            title={item.title}
            description={item.description}
            textBtn={item.textBtn}
            url={item.url}
            image={item.img}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {itemList.map((_, index) => (
          <button
            key={index}
            type="button"
            id={`carousel-indicator-${index + 1}`}
            className={`h-1 rounded-full shadow-sm shadow-black/30 transition-all ${
              index === currentIndex
                ? "bg-white dark:bg-base-full-dark w-8"
                : "bg-white/50 dark:bg-base-full-dark-50 w-4"
            }`}
            aria-current={index === currentIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <div className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-2 sm:px-4">
        <Button
          variant="flat"
          radius="full"
          className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] w-12 h-12 rounded-lg bg-transparent hover:bg-black/10 active:bg-black/30"
          onClick={prevSlide}
        >
          <CarouselArrowIcon className="size-6 text-white" />
        </Button>
      </div>
      <div className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-2 sm:px-4">
        <Button
          variant="flat"
          radius="full"
          className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] w-12 h-12 rounded-lg bg-transparent hover:bg-black/10 active:bg-black/30"
          onClick={nextSlide}
        >
          <CarouselArrowIcon className="size-6 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
