const apiKey = "b1fcdf24b8434bee84d292f9795648e3";
const url = `https://newsapi.org/v2/everything?q=bienestar&sortBy=popularity&language=es&apiKey=${apiKey}`;

const response = await fetch(url);

export const DATA_NEWS = await response.json();