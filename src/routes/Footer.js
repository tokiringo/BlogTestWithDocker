// Footer.jsを作成
import React from 'react';
import { Link } from "react-router-dom"; // 追加
import styles from "../css/Footer.module.css";

export const Footer = () => {
    return (
        <div className={styles.Footer}>
            <ul className={styles.linklist}>
                <li>
                    <Link to="/">ホーム</Link> 
                </li>
                <li>
                    <Link to="/about">筆者紹介</Link>
                </li>
                <li>
                    <Link to="/contact">お問い合わせ</Link>
                </li>
            </ul>
            <p className={styles.Author}>© 2024 Morisan </p>
        </div>
    )
}
