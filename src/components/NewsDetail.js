import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert } from 'reactstrap';
import parse from 'html-react-parser';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cleanHtml, setCleanHtml] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/news/${id}`);
        if (!res.ok) throw new Error('خطا در دریافت خبر');
        const data = await res.json();
        setNews(data);

        if (typeof window !== 'undefined' && data.passage) {
          const DOMPurify = require('dompurify');
          setCleanHtml(DOMPurify.sanitize(data.passage));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" /> در حال بارگذاری...
      </div>
    );
  }

  if (error) {
    return <Alert color="danger">خطا: {error}</Alert>;
  }

  if (!news) {
    return <Alert color="warning">خبر یافت نشد</Alert>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem', direction: 'rtl', textAlign: 'right'}}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '2rem',
          overflow: 'hidden',
        }}
      >
        <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{news.title}</h2>

        {news.description && (
          <p style={{ fontSize: '1.1rem', color: '#333' }}>{news.description}</p>
        )}

        {cleanHtml && (
          <div style={{ marginTop: '2rem' }}>
            <h5 style={{ marginBottom: '1rem' }}>متن کامل خبر:</h5>
            <div
              style={{
                backgroundColor: '#f9f9f9',
                padding: '1rem',
                borderRadius: '0.5rem',
                direction: 'rtl',
                textAlign: 'right',
              }}
              className="news-content"
            >
              {parse(cleanHtml)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
