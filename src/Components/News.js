import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

// const articles = [
//     {
//         "source": {
//             "id": "ars-technica",
//             "name": "Ars Technica"
//         },
//         "author": "Will Knight, wired.com",
//         "title": "Crypto botnet on X is powered by ChatGPT",
//         "description": "AI can be very easily harnessed to produce and disseminate misinformation.",
//         "url": "https://www.wired.com/story/chat-gpt-crypto-botnet-scam/",
//         "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2023/08/botnet-760x380.jpg",
//         "publishedAt": "2023-08-22T13:21:52+00:00",
//         "content": "27 with \r\nChatGPT may well revolutionize web search, streamline office chores, and remake education, but the smooth-talking chatbot has also found work as a social media crypto huckster.\r\nResearchers… [+5127 chars]"
//     },
//     {
//         "source": {
//             "id": "reuters",
//             "name": "Reuters"
//         },
//         "author": "Luc Cohen",
//         "title": "Jailed FTX founder Bankman-Fried to return to court for new plea",
//         "description": "Sam Bankman-Fried, founder of the now-bankrupt cryptocurrency exchange FTX, is due back in court on Tuesday for the first time since <a href=\"/legal/ftxs-bankman-fried-seeking-avoid-jail-due-back-court-2023-08-11/\">a U.S. judge revoked his bail and sent him t…",
//         "url": "https://www.reuters.com/legal/jailed-ftx-founder-bankman-fried-return-court-new-plea-2023-08-22/",
//         "urlToImage": "https://www.reuters.com/resizer/0yHFRCvtgyb2AF5JGsmzqJtsJGI=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/7WEW6VKU75NINJFAAYDAAVGC64.jpg",
//         "publishedAt": "2023-08-22T10:11:58Z",
//         "content": "NEW YORK, Aug 22 (Reuters) - Sam Bankman-Fried, founder of the now-bankrupt cryptocurrency exchange FTX, is due back in court on Tuesday for the first time since a U.S. judge revoked his bail and sen… [+2231 chars]"
//     },
//     {
//         "source": {
//             "id": "wired",
//             "name": "Wired"
//         },
//         "author": "Wired",
//         "title": "Scammers Used ChatGPT to Unleash a Crypto Botnet on X",
//         "description": "A botnet apparently connected to ChatGPT shows how easily, and effectively, artificial intelligence can be harnessed for disinformation.",
//         "url": "https://www.wired.com/story/chat-gpt-crypto-botnet-scam",
//         "urlToImage": "https://media.wired.com/photos/64dfc0e9c65d33e5f22478f8/191:100/w_1280,c_limit/AI-Chatbot-Crypto-Scam-1591242588.jpg",
//         "publishedAt": "2023-08-21T11:00:00Z",
//         "content": "ChatGPT may well revolutionize web search, streamline office chores, and remake education, but the smooth-talking chatbot has also found work as a social media crypto huckster.\r\nResearchers at Indian… [+3211 chars]"
//     },
//     {
//         "source": {
//             "id": "the-globe-and-mail",
//             "name": "The Globe And Mail"
//         },
//         "author": "Unknown",
//         "title": "Panic at the crypto",
//         "description": "Cryptocurrencies have taken another beating this week. Globe columnist Tim Kiladze makes sense of this latest crash",
//         "url": "https://www.theglobeandmail.com/podcasts/the-decibel/article-panic-at-the-crypto/",
//         "urlToImage": "https://www.theglobeandmail.com/resizer/_avQSW-gNb8XMlBIpkC-PJlBCCk=/1200x800/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/tgam/GHQ5WM2SKJDSDH53LMIWUHHUSA.png",
//         "publishedAt": "2022-06-16T09:00:00Z",
//         "content": "Cryptocurrencies have taken another dive this week. And this crash follows seven months of declines, even for the big names in the game. Bitcoin, for example, is down more than 60 per cent from its p… [+339 chars]"
//     }
// ];


const News = (props) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [articles, setArticles] = useState([]);

    //http://api.mediastack.com/v1/news?access_key=50a05d099599bc543ca6b21eda2bd073&categories=${props.category}&keywords=tennis&countries=in&offset=${page}&limit=${props.pageSize}
    async function getData(page) {
       // let url = `http://api.mediastack.com/v1/news?access_key=50a05d099599bc543ca6b21eda2bd073&categories=${props.category}&keywords=tennis&countries=in&offset=${page}&limit=${props.pageSize}`;
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=f821e288ff394ab9b46f36b463899554&country=in&page=${page}&pageSize=${props.pageSize}`;
        console.log(url);
        setLoading(true);
        props.setProgress(30);
        const response = await fetch(url);
        props.setProgress(70);
        const parsedResponse = await response.json();
        setLoading(false);
        setArticles(parsedResponse.articles);
        setTotalResults(parsedResponse.totalResults);
        props.setProgress(100);
    }

    const handleNextClick = async () => {
        getData(page+1);
        setPage(page + 1);
    }
    const handlePrevClick = async () => {
        getData(page-1);
        setPage(page - 1);
    }

    let isPrevDisabled = page === 1;
    let isNextDisabled = totalResults <= (page * props.pageSize);

    useEffect(() => {
        setPage(1);
        getData(1);
        // eslint-disable-next-line
    }, [props.category]);

    return (
        <div className="container my-4">
            <h3 className="text-center mb-4">News Monkey - Top {props.category} Headlines</h3>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles?.map((article) => { return <NewsItem key={article.url} article={article} /> })}
            </div>
            <div className="container my-3 d-flex justify-content-between">
                <button disabled={isPrevDisabled} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={isNextDisabled} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}

export default News
