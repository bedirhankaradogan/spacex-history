import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "../../pages/home/Home";
import Launch from "../../pages/launch/Launch";
import Message from "../../components/message/Message";

import { ReactComponent as SpacexLogo } from "../ui/icons/spacex.svg";

import "./app.css";

function App() {
  return (
    <div className="app">
      <div className="background">
        <div className="front-stars"/>
        <div className="back-stars"/>
      </div>
      <div className="content">
        <BrowserRouter>
          <div className="header">
            <Link to="/" className="header-logo-link">
              <SpacexLogo className="header-logo"/>
              <div className="header-logo-text">HISTORY</div>
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="launches/:launchId" element={<Launch/>}/>
            <Route path="*" element={<Message text="Page not found"/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
