import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import Pagination from './components/Pagination';
import './App.css';
import NewsCard from './components/NewsCard';

const API_KEY = '179af6ae85194a6898b08ae0e073fcfc';

const App = () => {
  const [categories] = useState(['business', 'entertainment', 'technology']);
  const [searchQuery, setSearchQuery] = useState('');
  //eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchSearchResults();
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=20&page=${currentPage}&apiKey=${API_KEY}`
      );
      setSearchResults(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / 20));
    } catch (error) {
      console.error(error);
    }
  };
  
  //eslint-disable-next-line
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
    //eslint-disable-next-line
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <nav>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
            <form onSubmit={handleSearchSubmit}>
              <input type="text" value={searchQuery} onChange={handleSearchChange} />
              <button type="submit">Search</button>
            </form>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to={`/${categories[0]}`} />} />
          {categories.map((category) => (
            <Route key={category} path={`/${category}`} element={<CategoryPage category={category} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

const CategoryPage = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchArticles();
    //eslint-disable-next-line
  }, [category, currentPage]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=20&page=${currentPage}&apiKey=${API_KEY}`
      );
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / 20));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = (article) => {
    // Handle like functionality using local storage
    // Example: localStorage.setItem(article.title, 'liked');
  };

  const handleHide = (article) => {
    // Handle hide functionality
    // Example: Filter out the hidden article from the articles array
    setArticles((prevArticles) => prevArticles.filter((prevArticle) => prevArticle.title !== article.title));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="category-page">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <div className="news-cards">
        {articles.map((article) => (
          <NewsCard key={article.title} article={article} onLike={handleLike} onHide={handleHide} />
        ))}
      </div>
      <Pagination page={currentPage} totalPages={totalPages} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
    </div>
  );
};

export default App;
