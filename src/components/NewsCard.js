import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NewsCard = ({ article, onLike, onHide }) => {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const storedLikeCount = localStorage.getItem(article.title);
    if (storedLikeCount) {
      setLikeCount(parseInt(storedLikeCount));
    }
  }, [article.title]);

  const handleLike = () => {
    const updatedLikeCount = likeCount + 1;
    setLikeCount(updatedLikeCount);
    localStorage.setItem(article.title, updatedLikeCount.toString());
    onLike(article);
  };

  const handleHide = () => {
    onHide(article);
  };
  
  const formatPublishedDate = () => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    return new Date(article.publishedAt).toLocaleString('en-US', options);
  };

  return (
    <Card>
      {article.urlToImage && (
        <Card.Img variant="top" src={article.urlToImage} alt={article.title} style={{ height: '200px', objectFit: 'cover' }} />
      )}
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>Author: {article.author}</Card.Text>
        <Card.Text>Published At: {formatPublishedDate()}</Card.Text>
        <Card.Text>Like: {likeCount}</Card.Text>
        <div style={{ marginBottom: '20px' }}>
          <Button variant="primary" onClick={handleLike}>
            Like
          </Button>{'   '}
          <Button variant="secondary" onClick={handleHide}>
            Hide
          </Button>
        </div>
        <Button variant="info" href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
