import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Article.module.css';
import commonStyles from "../css/common/common.module.css"
import classNames from 'classnames';

export const Hashtag = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const [hashtagData, setHashtagData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHashtag = async () => {
      const url = `http://localhost:3002/keyword/${encodeURIComponent(queryParam)}`;
      try {
        const response = await axios.get(url);
        setHashtagData(response.data.hashtagData || []);
      } catch (err) {
        console.error('Error fetching hashtag data: ', err);
        setError(err);
      }
    };

    if (queryParam) {
      fetchHashtag();
    }
  }, [queryParam]); 

  if (error) {
    return <div>Error fetching hashtag data: {error.message}</div>;
  }

  return (
    <div className={styles.HashtagPage}>
      <h1 className={classNames(styles.Title, commonStyles['common_max_width'])}>#{queryParam}</h1>
      <main className={styles.ArticleList}>
        {hashtagData.length > 0 ? (
          hashtagData.map((article) => (
            <div 
              key={article._id} 
              className={styles.Article} 
              onClick={() => window.location.href = `../${article._id}/detail`}
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
                    to={`/keyword/hashtag?q=${encodeURIComponent(`#${hashtag}`)}`}
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

