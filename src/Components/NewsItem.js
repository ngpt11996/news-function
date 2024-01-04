import React from "react";
import defaultImage from "./../default-image.jpg"

const NewsItem = (props) => {
    let { title, description, urlToImage, url, author, publishedAt, source } = props.article;

    return (
        <div className="col-md-4">
        <div className="card" style={{height:"84vh",margin: "2vh"}}>
            <span className="badge bg-danger">{!source?.name?"unkown":source.name}</span>
            <img src={!urlToImage?defaultImage:urlToImage} style={{height:"30vh"}}className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{!title?"unkown":title}</h5>
                <p className="card-text">{!description?"unkown":description}</p>
                <p className="card-text"><small className="text-muted">Author: {!author?"unkown":author} and Published At: {!publishedAt?"unkown":publishedAt}</small></p>
                <a href={url}  style={{marginBottom:"1vh"}} rel="noreferrer" className="btn btn-primary" target="_blank">Read More</a>
            </div>
        </div>
        </div>
    );
};

export default NewsItem;
