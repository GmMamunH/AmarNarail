import { useState, useEffect } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "0cc82a8a00ef4b29b7c20b3705bb46e0";

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles || []); // Ensure articles exist in the response
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [apiKey]); // Empty dependency array ensures it runs only once

  return (
    <>
      <div>
        <h1 className="text-2xl text-red-600 text-center">Daily Amar Narail</h1>
      </div>
      <div>
        {loading ? (
          <p className="text-center">Loading news...</p>
        ) : news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="border p-4 mb-4">
              <h2 className="text-lg font-bold">{article?.title}</h2>
              <h4 className="text-xs font-bold">
                {article?.author} <span> - </span>
                {article?.publishedAt}
              </h4>
              <p>{article?.description || "No description available"}</p>
              <img src={article?.urlToImage} alt="" />
              <p>{article?.content}</p>
              <p>{article?.source?.name}</p>
              <a href={article?.url}>details</a>
            </div>
          ))
        ) : (
          <p className="text-center">No news available.</p>
        )}
      </div>
    </>
  );
}

export default App;
