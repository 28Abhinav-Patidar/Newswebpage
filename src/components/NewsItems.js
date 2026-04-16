import React from 'react';

export default function NewsItems(props) {
  let { title, description, imageurl, NewsUrl, author, dateandtime } = props;

  return (
    <div className="card my-3">
      <img src={imageurl} className="card-img-top" alt="news" />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p>{author || "Unknown"}</p>
        <p>{dateandtime ? new Date(dateandtime).toGMTString() : "No date"}</p>
        <a href={NewsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
          Read Full Article
        </a>
      </div>
    </div>
  );
}