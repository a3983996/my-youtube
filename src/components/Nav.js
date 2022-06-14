import React from "react";
import search from "../img/search.png";
import list from "../img/list.png";

const Nav = ({ setTarget }) => {
  const targetHandler = (e) => {
    if (document.querySelector("input[type=text]").value) {
      let text = document.querySelector("input[type=text]").value;
      setTarget(text);
    }
    document.querySelector("input[type=text]").value = "";
  };
  return (
    <nav>
      <h1 className="logo">Youtube</h1>
      <div className="search">
        <input type="checkbox" id="input" />
        <input type="text" />
        <label htmlFor="input" onClick={targetHandler}>
          <img src={search} alt="搜尋" />
        </label>
      </div>
      <div className="list">
        <input type="checkbox" id="down" />
        <label htmlFor="down">
          <img src={list} alt="下拉" />
        </label>
        <ul>
          <li>Youtube</li>
          <li>B站</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
