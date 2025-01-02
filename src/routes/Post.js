import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/Post.module.css'; // CSS Modulesファイルをインポート

export const Post = () => {
  const [formData, setFormData] = useState({
    hashtag: '',
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    writer: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const url = 'http://localhost:3002/article/post'; // Backend API URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.date || !formData.writer) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.hashtag && !formData.hashtag.startsWith('#')) {
        setError('Hashtag must start with a "#" if provided.');
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('hashtag', formData.hashtag);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('writer', formData.writer);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('データが送信されました。');
      console.log(response.data);
      setFormData({
        hashtag: '',
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 10), 
        writer: '',
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
        if (error.response) {
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
     
        <div className={styles.field}>
          <label className={styles.label}>タイトル</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>内容</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>ハッシュタグ</label>
          <input
            className={styles.input}
            type="text"
            name="hashtag"
            value={formData.hashtag}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>日付</label>
          <input
            className={styles.input}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>作成者</label>
          <input
            className={styles.input}
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>画像</label>
          <input
            className={styles.input}
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Preview" className={styles.image} />
            </div>
          )}
        </div>
        <button className={styles.button} type="submit">
          送信
        </button>
      </form>
    </div>
  );
};
