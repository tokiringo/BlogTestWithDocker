// Footer.jsを作成
import React from 'react';
import { Link } from "react-router-dom"; // 追加
import styles from "../css/Link.module.css";

export const Footer = () => {
    return (
    
        <ul className={styles.linklist}>
            <li>
                <Link to="/">ホーム</Link> 
            </li>
            <li>
                <Link to="https://www.receno.com/pen/sense/">センスのいらないインテリア</Link>
            </li>
            <li>
                <Link to="/contact">ナチュラル・ヴィンテージ</Link>
            </li>
            <li>
                <Link to="/contact">インテリアを学ぶ</Link>
            </li>
            <li>
                <Link to="/contact">インテリアを楽しむ</Link>
            </li>
        </ul>
    )
}
