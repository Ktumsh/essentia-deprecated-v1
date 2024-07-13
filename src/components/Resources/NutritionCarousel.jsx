import { useState, useEffect } from "react";
import { CarouselArrowIcon } from "@/icons/react/CarouselArrow";
import { Button } from "@nextui-org/button";
import NutritionCarouselItem from "./NutritionCarouselItem";
import useWindowSize from "@/components/UI/useWindowSize";

const NutritionCarousel = ({ data, startIndex, totalItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 768) {
      setItemsPerSlide(1);
    } else if (windowSize.width <= 1024) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(3);
    }
  }, [windowSize]);

  const groupedItems = [];
  const slicedData = data.slice(startIndex, startIndex + totalItems);

  for (let i = 0; i < slicedData.length; i += itemsPerSlide) {
    groupedItems.push(slicedData.slice(i, i + itemsPerSlide));
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + groupedItems.length) % groupedItems.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedItems.length);
  };

  return (
    <div id="nutrition-carousel" className="relative w-full">
      <div className="relative overflow-hidden h-[410px]">
        <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out">
          {groupedItems.map((group, index) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % groupedItems.length;
            const isPrev =
              index ===
              (currentIndex - 1 + groupedItems.length) % groupedItems.length;
            return (
              <div
                key={index}
                className={`sm:px-3 absolute w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform transition-transform duration-500 ${
                  isCurrent
                    ? "translate-x-0"
                    : isNext
                    ? "translate-x-full"
                    : isPrev
                    ? "-translate-x-full"
                    : "hidden"
                }`}
              >
                {group.map((item, idx) => (
                  <NutritionCarouselItem
                    key={idx}
                    modalTitle={item.modalTitle}
                    modalImage={item.modalImage}
                    modalBody={item.modalBody}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="hidden lg:flex absolute z-30 -translate-x-1/2 space-x-3 rtl:space-x-reverse -bottom-7 left-1/2">
        {groupedItems.map((_, index) => (
          <button
            key={index}
            type="button"
            id={`carousel-indicator-${index + 1}`}
            className={`h-1 rounded-full shadow-sm transition-all ${
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
      <div className="absolute translate-y-1/2 top-7 start-0 sm:start-3 z-30 flex items-center justify-center h-full px-2 sm:px-4 pointer-events-none">
        <Button
          variant="flat"
          radius="full"
          className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] w-12 h-12 rounded-lg bg-black/10 hover:bg-black/20 active:bg-black/30 pointer-events-auto"
          onClick={prevSlide}
        >
          <CarouselArrowIcon className="size-6 text-white" />
        </Button>
      </div>
      <div className="absolute translate-y-1/2 top-7 end-0 sm:end-3 z-30 flex items-center justify-center h-full px-2 sm:px-4 pointer-events-none">
        <Button
          variant="flat"
          radius="full"
          className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] w-12 h-12 rounded-lg bg-black/10 hover:bg-black/20 active:bg-black/30 pointer-events-auto"
          onClick={nextSlide}
        >
          <CarouselArrowIcon className="size-6 text-white rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default NutritionCarousel;
