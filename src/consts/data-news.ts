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
