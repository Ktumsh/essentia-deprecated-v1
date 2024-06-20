/*
const apiKey = "b5bd7a33fe1c451aa3dab3c9fe26b1ec";
const url = "https://api.worldnewsapi.com/search-news?language=es";

export const fetchNews = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const newsData = await response.json();
    return newsData.news || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
*/

const apiKey = "b1fcdf24b8434bee84d292f9795648e3";
const url = `https://newsapi.org/v2/everything?q=bienestar&sortBy=popularity&language=es&apiKey=${apiKey}`;

export const fetchNews = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const newsData = await response.json();
    return newsData.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

/*
const apiKey = "pub_46865806f7b1c5ed74109cf5b00db013cd968";
const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=es&category=health`;

export const fetchNews = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const newsData = await response.json();
    return newsData.results || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
*/
