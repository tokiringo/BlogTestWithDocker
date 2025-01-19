import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from "../css/Detail.module.css";


export function Detail() {
  const { id } = useParams(); // URLから:idを取得
  const [detail, setDetail] = useState(null); // 初期値はnullに変更（データが取得されるまでは空）
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const url = `http://localhost:3002/${id}/detail`; // idをテンプレートリテラルで埋め込む
      try {
        const response = await axios.get(url);
        console.log(response);
        setDetail(response.data.detail || []); // データがない場合は空配列
      } catch (err) {
        console.error('Error fetching details: ', err);
        setError(err);
      }
    };

    fetchDetail();
  }, [id]); // idが変更されるたびに再度実行される

  if (error) {
    console.error('Error fetching details: ', error);
    return <div>ただいま処理中です。しばらくお待ちください。それでも改善されない場合は、時間を空けて再度アクセスしてください。</div>;
  }

  return (
    <div className={styles.Detail}>
      {detail ? (
        <div>
          <p className={styles.DetailDate}>{detail.date}</p>
          {detail.image_url && (
            <img
              src={`http://localhost:3002/${detail.image_url}`}
              alt="Article"
              className={styles.DetailImage}
            />
          )}
          <p className={styles.DetailTitle}>{detail.title}</p>
          <div className={styles.DetailHashtags}>
            {detail.hashtags.map((hashtag, index) => (
              <span key={index} className={styles.Hashtag}>
                {hashtag}
              </span>
            ))}
          </div>
          <p className={styles.DetailDescription}>{detail.description}</p>
          <p className={styles.DetailWriter}>作成者: {detail.writer}</p>
        </div>
      ) : (
        <p>記事が見つかりません。</p>
      )}
    </div>
  );
}
