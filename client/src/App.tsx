import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  }, []);

  return (
    <>
      <p>
        The current time is {new Date(currentTime * 1000).toLocaleString()}.
      </p>
    </>
  );
}

export default App;
