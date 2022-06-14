import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import Video from "./pages/Video";
import "./styles/style.css";
import { Switch, Route } from "react-router-dom";

const App = () => {
  let [arrID, setArrID] = useState([]);
  let [target, setTarget] = useState("");
  let [next, setNext] = useState("");
  return (
    <main>
      <Switch>
        <Route path="/video/:id">
          <Video />
        </Route>
        <Route path="/">
          <HomePage
            arrID={arrID}
            setArrID={setArrID}
            target={target}
            setTarget={setTarget}
            next={next}
            setNext={setNext}
          />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
