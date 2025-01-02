import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../css/Article.module.css";

export const Article = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const url = 'http://localhost:3002/articles';
      try {
        const response = await axios.get(url);
        setArticles(response.data.articleData || []); 
      } catch (err) {
        console.error('Error fetching articles: ', err);
        setError(err);
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    console.error('Error fetching articles: ', error);
    return <div>記事の取得に失敗しました。</div>;
  }

  return (
    <div className={styles.Page}>
      <h1 className={styles.Title}>記事一覧</h1>
      <main className={styles.ArticleList}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <a key={article._id} href={`${article._id}/detail`} className={styles.Article}>
              <p className={styles.ArticleDate}>{article.date}</p>
              {article.image_url && (
                <img src={`http://localhost:3002/${article.image_url}`} className={styles.ArticleImage}/>
              )}
              <p className={styles.ArticleTitle}>{article.title}</p>
              <div className={styles.ArticleHashtags}>
                {article.hashtags.map((hashtag, index) => (
                  <span key={index} className={styles.Hashtag}>
                    {hashtag}
                  </span>
                ))}
              </div>
              <p className={styles.ArticleDescription}>{article.description}</p>
              <p className={styles.ArticleWriter}>作成者: {article.writer}</p>
            </a>
          ))
        ) : (
          <p>記事が見つかりません。</p>
        )}
      </main>
    </div>
  );
};
