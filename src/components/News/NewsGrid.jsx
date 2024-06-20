/*
import { useState, useEffect } from "react";
import NewsGridItem from "./NewsGridItem";
import { fetchNews } from "@/consts/data-news";
import { SpinnerIcon } from "./Spinner";

const NewsGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchNews();
        setNewsData(news);
        const isTablet = window.matchMedia("(max-width: 1024px)").matches;
        setVisibleCount(isTablet ? 6 : 7);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    setTimeout(() => {
      setVisibleCount((prevCount) =>
        isTablet ? prevCount + 4 : prevCount + 6
      );
      setLoadingMore(false);
    }, 500);
  };

  const loader = (
    <div className="flex items-center justify-center h-16 mb-8 mx-auto">
      <span className="flex flex-col items-center justify-center text-base-color-dark-m dark:text-base-color-dark-m">
        <SpinnerIcon className="size-18" />
      </span>
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <div>
      <div id="news-grid" className="grid grid-cols-12 gap-2 my-5">
        {newsData.slice(0, visibleCount).map((item, index) => (
          <NewsGridItem
            key={index}
            link={item.url}
            category="health"
            source_icon="/extras/news-source-concept.webp"
            className={
              index < 4
                ? index % 4 === 0 || index % 4 === 3
                  ? "col-span-12 sm:col-span-7"
                  : "col-span-12 sm:col-span-5"
                : "col-span-12 sm:col-span-6 lg:col-span-4"
            }
            title={item.title}
            creator={item.author}
            pubDate={item.publish_date}
            views={item.sentiment + ""}
            image_url={item.image}
          />
        ))}
      </div>
      {visibleCount < newsData.length && (
        <>
          {loadingMore ? (
            loader
          ) : (
            <div className="flex justify-center items-center mx-auto w-full h-16 mb-8 text-base-color dark:text-base-color-dark">
              <button
                type="button"
                onClick={loadMore}
                className="w-fit h-8 px-5 bg-bittersweet-500/50 dark:bg-cerise-red-600/50 border-2 border-bittersweet-400 dark:border-cerise-red-600 rounded-full hover:brightness-90 transition"
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsGrid;
*/

import { useState, useEffect } from "react";
import NewsGridItem from "./NewsGridItem";
import { fetchNews } from "@/consts/data-news";
import { SpinnerIcon } from "./Spinner";

const NewsGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchNews();
        setNewsData(articles);
        const isTablet = window.matchMedia("(max-width: 1024px)").matches;
        setVisibleCount(isTablet ? 6 : 7);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    setTimeout(() => {
      setVisibleCount((prevCount) =>
        isTablet ? prevCount + 4 : prevCount + 6
      );
      setLoadingMore(false);
    }, 500);
  };

  const loader = (
    <div className="flex items-center justify-center h-16 mb-8 mx-auto">
      <span className="flex flex-col items-center justify-center text-base-color-dark-m dark:text-base-color-dark-m">
        <SpinnerIcon className="size-18" />
      </span>
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <div>
      <div id="news-grid" className="grid grid-cols-12 gap-2 my-5">
        {newsData.slice(0, visibleCount).map((item, index) => (
          <NewsGridItem
            key={index}
            url={item.url}
            className={
              index < 4
                ? index % 4 === 0 || index % 4 === 3
                  ? "col-span-12 sm:col-span-7"
                  : "col-span-12 sm:col-span-5"
                : "col-span-12 sm:col-span-6 lg:col-span-4"
            }
            category="health"
            title={item.title}
            imageAuthor="https://play-lh.googleusercontent.com/aRhlAJmDLUcr0awiooFzB7a4RncajITPWRIwYSUogHJf37MYN2CLtnTyl3LV6mwzzQ"
            author={item.author}
            date={item.publishedAt}
            views={Math.floor(Math.random() * 200)}
            image={item.urlToImage}
          />
        ))}
      </div>
      {visibleCount < newsData.length && (
        <>
          {loadingMore ? (
            loader
          ) : (
            <div className="flex justify-center items-center mx-auto w-full h-16 mb-8 text-base-color dark:text-base-color-dark">
              <button
                type="button"
                onClick={loadMore}
                className="w-fit h-8 px-5 bg-bittersweet-500/50 dark:bg-cerise-red-600/50 border-2 border-bittersweet-400 dark:border-cerise-red-600 rounded-full hover:brightness-90 transition"
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsGrid;

/*
import { useState, useEffect } from "react";
import NewsGridItem from "./NewsGridItem";
import { fetchNews } from "@/consts/data-news";
import { SpinnerIcon } from "./Spinner";

const NewsGrid = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const results = await fetchNews();
        setNewsData(results);
        //const isTablet = window.matchMedia("(max-width: 1024px)").matches;
        //setVisibleCount(isTablet ? 6 : 7);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const isTablet = window.matchMedia("(max-width: 1024px)").matches;
    setTimeout(() => {
      setVisibleCount((prevCount) =>
        isTablet ? prevCount + 4 : prevCount + 6
      );
      setLoadingMore(false);
    }, 500);
  };

  const loader = (
    <div className="flex items-center justify-center h-16 mb-8 mx-auto">
      <span className="flex flex-col items-center justify-center text-base-color-dark-m dark:text-base-color-dark-m">
        <SpinnerIcon className="size-18" />
      </span>
    </div>
  );

  if (loading) {
    return loader;
  }

  return (
    <div>
      <div id="news-grid" className="grid grid-cols-12 gap-2 my-5">
        {newsData.slice(0, visibleCount).map((item, index) => (
          <NewsGridItem
            key={index}
            link={item.link}
            className={
              index < 4
                ? index % 4 === 0 || index % 4 === 3
                  ? "col-span-12 sm:col-span-7"
                  : "col-span-12 sm:col-span-5"
                : "col-span-12 sm:col-span-6 lg:col-span-4"
            }
            category={item.category}
            title={item.title}
            source_icon={item.source_icon}
            creator={item.creator}
            pubDate={item.pubDate}
            views={120}
            image_url={item.image_url}
          />
        ))}
      </div>
      {visibleCount < newsData.length && (
        <>
          {loadingMore ? (
            loader
          ) : (
            <div className="flex justify-center items-center mx-auto w-full h-16 mb-8 text-base-color dark:text-base-color-dark">
              <button
                type="button"
                onClick={loadMore}
                className="w-fit h-8 px-5 bg-bittersweet-500/50 dark:bg-cerise-red-600/50 border-2 border-bittersweet-400 dark:border-cerise-red-600 rounded-full hover:brightness-90 transition"
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsGrid;
*/
