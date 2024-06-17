const apiKey = "b1fcdf24b8434bee84d292f9795648e3";
const url = `https://newsapi.org/v2/everything?q=bienestar&from=2024-05-28&to=2024-05-30&sortBy=popularity&language=es&apiKey=${apiKey}`;

const response = await fetch(url);

export const DATA_NEWS = await response.json();
