import React from "react";
import "./App.css";
import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <>
      <div className="app-root">
        <header className="top-bar">
          <div className="top-bar-inner">
            <div className="brand">TinyLink</div>
          </div>
        </header>
        <PageRoutes />
      </div>
    </>
  );
};

export default App;
