import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import articleStyles from "../css/Article.module.css";
import commonStyles from "../css/common/common.module.css"
import classNames from 'classnames';

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
    <div className={articleStyles.Page}>
      <h1 className={commonStyles.common_max_width}>記事一覧</h1>
        <div className={classNames(articleStyles.SortButtons, commonStyles['common_max_width'])}>
          <button
              className={sortField === 'date' && sortOrder === 'desc' ? articleStyles.ActiveButton : articleStyles.Button}
              onClick={() => {
                  setSortField('date');
                  setSortOrder('desc');
              }}
          >
              新しい順
          </button>
          <button
              className={sortField === 'date' && sortOrder === 'asc' ? articleStyles.ActiveButton : articleStyles.Button}
              onClick={() => {
                  setSortField('date');
                  setSortOrder('asc');
              }}
          >
              古い順
          </button>
          <button
              className={sortField === 'visit_count' && sortOrder === 'desc' ? articleStyles.ActiveButton : articleStyles.Button}
              onClick={() => {
                  setSortField('visit_count');
                  setSortOrder('desc');
              }}
          >
              人気順
          </button>
        </div>
      <main className={articleStyles.ArticleList}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div 
              key={article._id} 
              className={articleStyles.Article} 
              onClick={() => window.location.href = `${article._id}/detail`}
            >
              <p className={articleStyles.ArticleDate}>{article.date}</p>
              {article.image_url && (
                <img 
                  src={`http://localhost:3002/${article.image_url}`} 
                  alt={article.title} 
                  className={articleStyles.ArticleImage} 
                />
              )}
              <p className={articleStyles.ArticleTitle}>{article.title}</p>
              <p className={articleStyles.ArticleDescription}>{article.description}</p>
              <div className={articleStyles.ArticleHashtags}>
                {article.hashtags.map((hashtag, index) => (
                  <Link
                    key={index}
                    to={`/keyword/hashtag?q=${encodeURIComponent(`${hashtag}`)}`}
                    className={articleStyles.Hashtag}
                    onClick={(e) => e.stopPropagation()} // 親のクリックイベントを防止
                  >
                    #{hashtag}
                  </Link>
                ))}
              </div>
              <p className={articleStyles.ArticleWriter}>作成者: {article.writer}</p>
            </div>
          ))
        ) : (
          <p>記事が見つかりません。</p>
        )}
      </main>
    </div>
  );
};