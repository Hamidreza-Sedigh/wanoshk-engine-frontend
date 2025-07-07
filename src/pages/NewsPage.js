import React from 'react';
import { useParams } from 'react-router-dom';
import NewsDetail from '../components/NewsDetail'; // مسیر دقیق کامپوننت NewsDetail

const NewsPage = () => {
  const { id } = useParams(); // خواندن آیدی از آدرس URL
  console.log("news id:", id);

  return (
    <div className="container mt-4">
      <h2>جزئیات خبر</h2>
      <NewsDetail newsId={id} />
    </div>
  );
};

export default NewsPage;
