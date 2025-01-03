// App.js
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { About } from "./routes/About"; 
import { Contact } from "./routes/Contact";  
import { NotFound } from "./routes/NotFound"; 
import { Footer } from "./routes/Footer";
import { Header } from "./routes/Header";
import { Article } from "./routes/Article";
import { Post } from "./routes/Post";
import { HamburgerMenu } from "./routes/HamburgerMenu";
import { Detail } from "./routes/Detail";
import { Hashtag } from "./routes/Hashtag";

function App () {
  const location = useLocation();
  return (
    <div>
      <HamburgerMenu />
      {/* ホーム画面の時だけ、ヘッダーを表示 */}
      {location.pathname === "/" && <Header />} 
      <Routes>
        <Route path="/" element={ <Article /> } />
        <Route path="/about" element={ <About /> } /> 
        <Route path="/contact" element={ <Contact /> } /> 
        <Route path="/post" element={ <Post /> } /> 
        <Route path=":id/detail" element={ <Detail /> } /> 
        <Route path="keyword/:hashtag" element={ <Hashtag /> } />
        <Route path="*" element={ <NotFound /> } /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
