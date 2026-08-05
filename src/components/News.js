import React, { useState, useEffect, useCallback } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
  
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const { category, pagesize, setprog } = props;
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalResults, settotalresults] = useState(0);
  const [error, setError] = useState(null);

 const updateNews = useCallback(async () => {
   setprog(10);
   setloading(true);
   setError(null);
   setpage(1);

    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=1&pageSize=${pagesize}`;
    
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Server status: ${data.status}`);
      }
      let parsedData = await data.json();
      setarticles(parsedData.articles || []);
      settotalresults(parsedData.totalResults || 0);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Failed to fetch news. Please check your API key and network connection.");
      setarticles([]);
      settotalresults(0);
    } finally {
     setloading(false);
     setprog(100);
   }
 }, [category, pagesize, setprog]);
  useEffect(() => {
  updateNews();
}, [updateNews]);


 const fetchMoreData = async () => {
  const nextPage = page + 1;
  setpage(nextPage);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pagesize}`;

  try {
    let data = await fetch(url);
    if (!data.ok) {
      throw new Error(`Server status: ${data.status}`);
    }
    let parsedData = await data.json();
    setarticles(prev => prev.concat(parsedData.articles || []));
    settotalresults(parsedData.totalResults || 0);
  } catch (err) {
    console.error("Failed to fetch more news:", err);
  }
};

  return (
    <div className="container my-4">
      <h2 className='text-center'>
        Today's Headlines {props.category === "general" ? "" : `on ${capitalize(props.category)}`}
      </h2>

      {error && <div className="alert alert-danger text-center my-3" role="alert">{error}</div>}

      {loading && <Spinner />}

      <InfiniteScroll style={{ overflow: "hidden" }}
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={element.description ? element.description.slice(0, 80) : ""}
                  imageurl={element.urlToImage || "https://via.placeholder.com/150"}
                  author={element.author}
                  dateandtime={element.publishedAt}
                  NewsUrl={element.url}
                />
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

News.defaultProps = {
  pagesize: 10,
}

News.propTypes = {
  pagesize: PropTypes.number,
  category: PropTypes.string
}