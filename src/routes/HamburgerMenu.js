import React, { useState } from "react";
import styles from "../css/HamburgerMenu.module.css";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.hamburgerMenu}>
      {/* Hamburger icon */}
      <div
        className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Menu items */}
      <nav className={`${styles.menu} ${isOpen ? styles.show : ""}`}>
        <ul>
          <li><a href="/">ホーム</a></li>
          <li><a href="/post">投稿</a></li>
          <li><a href="../localhost//8080">カレンダー</a></li>
          <li><a href="#services">ログアウト</a></li>
          
        </ul>
      </nav>
    </div>
  );
};


