import React, { useState } from "react";
import classNames from "classnames";
import hamburgerMenuStyles from "../css/HamburgerMenu.module.css";
import commonStyles from "../css/common/common.module.css"

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(hamburgerMenuStyles.hamburgerMenu, commonStyles['common_max_width'])}>
      {/* Hamburger icon */}
      <div
        className={`${hamburgerMenuStyles.hamburgerIcon} ${isOpen ? hamburgerMenuStyles.open : ""}`}
        onClick={toggleMenu}
      >
        <div className={hamburgerMenuStyles.line}></div>
        <div className={hamburgerMenuStyles.line}></div>
        <div className={hamburgerMenuStyles.line}></div>
      </div>

      {/* Menu items */}
      <nav className={`${hamburgerMenuStyles.menu} ${isOpen ? hamburgerMenuStyles.show : ""}`}>
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


