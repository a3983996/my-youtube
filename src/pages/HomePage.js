import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Picture from "../components/Picture";
import { v4 as uuidv4 } from "uuid";

const HomePage = ({ arrID, setArrID, target, setTarget, next, setNext }) => {
  let [navStatus, setNavStatus] = useState(true);

  useEffect(() => {
    console.log(arrID);
    async function fetchData() {
      let vIDArr = [];
      let nextPage = "";
      let url =
        "https://www.googleapis.com/youtube/v3/search" +
        `?key=${process.env.REACT_APP_GOOGLE_API_KEY}` +
        "&part=snippet" +
        "&type=video" +
        "&maxResults=10" +
        "&safeSearch=strict" +
        "&q=" +
        target;
      if (target !== "") {
        setNext("");
        vIDArr = [];
        try {
          let urlData = await fetch(url);
          let body = await urlData.json();
          nextPage = body.nextPageToken;
          body.items.forEach((item) => {
            vIDArr.push({
              id: item.id.videoId,
              imgSrc: item.snippet.thumbnails.high.url,
              title: item.snippet.title,
            });
          });
        } catch (error) {
          console.log(error);
        }
        setArrID(vIDArr);
        setNext(nextPage);
      }
    }
    fetchData();
  }, [target]);
  const loadnext = async () => {
    let vIDArr = [];
    let nextPage = "";
    let url =
      "https://www.googleapis.com/youtube/v3/search" +
      `?key=${process.env.REACT_APP_GOOGLE_API_KEY}` +
      "&part=snippet" +
      "&type=video" +
      "&maxResults=10" +
      "&safeSearch=strict" +
      "&q=" +
      target +
      "&pageToken=" +
      next;

    try {
      let urlData = await fetch(url);
      let body = await urlData.json();
      nextPage = body.nextPageToken;
      body.items.forEach((item) => {
        vIDArr.push({
          id: item.id.videoId,
          imgSrc: item.snippet.thumbnails.high.url,
          title: item.snippet.title,
        });
      });
    } catch (error) {
      console.log(error);
    }
    setArrID(arrID.concat(vIDArr));
    setNext(nextPage);
  };
  const throttle = (func, wait, mustRun) => {
    let timeout,
      startTime = new Date();
    return function () {
      let context = this,
        args = arguments,
        curTime = new Date();

      clearTimeout(timeout);
      if (curTime - startTime >= mustRun) {
        func.apply(context, args);
        startTime = curTime;
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  };
  const listingPoint = () => {
    let marginBot;
    if (document.body.scrollTop) {
      marginBot =
        document.body.scrollHeight -
        document.body.scrollTop -
        document.body.clientHeight;
    } else {
      marginBot =
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        document.documentElement.clientHeight;
    }

    if (
      document.querySelector(".picture") &&
      marginBot <= 0 + document.querySelector(".picture").offsetHeight * 2
    ) {
      document.querySelector(".loadnext").click();
    }
  };
  useEffect(() => {
    let beforeScroll = document.documentElement.scrollTop;

    window.onscroll = throttle(
      function () {
        listingPoint();
        let afterScrollTop = document.documentElement.scrollTop;
        let delta = afterScrollTop - beforeScroll;
        beforeScroll = afterScrollTop;
        if (delta > 0) {
          setNavStatus(false);
        } else {
          setNavStatus(true);
        }
      },
      500,
      500
    );
  }, []);
  useEffect(() => {
    let nav = document.querySelector("nav");
    if (navStatus) {
      nav.style.top = "0px";
    } else {
      nav.style.top = "-50px";
    }
  }, [navStatus]);
  return (
    <div className="homePage">
      <Nav setTarget={setTarget} />
      <div className="videos">
        {arrID &&
          arrID.map((item) => {
            return <Picture item={item} key={uuidv4()} />;
          })}
      </div>
      <button onClick={loadnext} className="loadnext"></button>
    </div>
  );
};

export default HomePage;
