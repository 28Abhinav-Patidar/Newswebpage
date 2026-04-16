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

 const updateNews = useCallback(async () => {
  setprog(10);
  setloading(true);

  const url = `http://localhost:5000/news?category=${category}&page=1&pageSize=${pagesize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json();

  setarticles(parsedData.articles || []);   // ✅ FIX
  settotalresults(parsedData.totalResults || 0); // ✅ FIX
  setloading(false);

  setprog(100);
}, [category, pagesize, setprog]);
  useEffect(() => {
  updateNews();
}, [updateNews]);


 const fetchMoreData = async () => {
  const nextPage = page + 1;
  setpage(nextPage);

  const url = `http://localhost:5000/news?category=${category}&page=${nextPage}&pageSize=${pagesize}`;

  let data = await fetch(url);
  let parsedData = await data.json();

 setarticles(prev => prev.concat(parsedData.articles || []));
settotalresults(parsedData.totalResults || 0);
};

  return (
    <div className="container my-4">
      <h2 className='text-center'>
        Today's Headlines {props.category === "general" ? "" : `on ${capitalize(props.category)}`}
      </h2>

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