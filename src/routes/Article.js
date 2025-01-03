import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "../css/Article.module.css";

export const Article = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null); 
  const [sortField, setSortField] = useState('date'); // デフォルトは date
  const [sortOrder, setSortOrder] = useState('desc'); // デフォルトは降順 (最新)

  useEffect(() => {
    const fetchArticles = async () => {
      const url =`http://localhost:3002/articles?sortField=${sortField}&sortOrder=${sortOrder}`;
      try {
        const response = await axios.get(url);
        setArticles(response.data.articleData || []);
      } catch (error) {
        console.error('Error fetching articles: ', error);
        setError(error); 
      }
    };

    fetchArticles();
  }, [sortField, sortOrder]);

  // エラーがある場合の処理
  if (error) {
    return <div>記事の取得に失敗しました。</div>;
  }

  return (
    <div className={styles.Page}>
      <h1 className={styles.Title}>記事一覧</h1>
        <div className={styles.SortButtons}>
          <button
              className={sortField === 'date' && sortOrder === 'desc' ? styles.ActiveButton : styles.Button}
              onClick={() => {
                  setSortField('date');
                  setSortOrder('desc');
              }}
          >
              新しい順
          </button>
          <button
              className={sortField === 'date' && sortOrder === 'asc' ? styles.ActiveButton : styles.Button}
              onClick={() => {
                  setSortField('date');
                  setSortOrder('asc');
              }}
          >
              古い順
          </button>
          <button
              className={sortField === 'visit_count' && sortOrder === 'desc' ? styles.ActiveButton : styles.Button}
              onClick={() => {
                  setSortField('visit_count');
                  setSortOrder('desc');
              }}
          >
              人気順
          </button>
        </div>
      <main className={styles.ArticleList}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div 
              key={article._id} 
              className={styles.Article} 
              onClick={() => window.location.href = `${article._id}/detail`}
            >
              <p className={styles.ArticleDate}>{article.date}</p>
              {article.image_url && (
                <img 
                  src={`http://localhost:3002/${article.image_url}`} 
                  alt={article.title} 
                  className={styles.ArticleImage} 
                />
              )}
              <p className={styles.ArticleTitle}>{article.title}</p>
              <div className={styles.ArticleHashtags}>
                {article.hashtags.map((hashtag, index) => (
                  <Link
                    key={index}
                    to={`/keyword/hashtag?q=${encodeURIComponent(`${hashtag}`)}`}
                    className={styles.Hashtag}
                    onClick={(e) => e.stopPropagation()} // 親のクリックイベントを防止
                  >
                    #{hashtag}
                  </Link>
                ))}
              </div>
              <p className={styles.ArticleDescription}>{article.description}</p>
              <p className={styles.ArticleWriter}>作成者: {article.writer}</p>
            </div>
          ))
        ) : (
          <p>記事が見つかりません。</p>
        )}
      </main>
    </div>
  );
};