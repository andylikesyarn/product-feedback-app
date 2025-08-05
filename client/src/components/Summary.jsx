import { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./Comps.css";

function Summary() {
  const [number, setNumber] = useState(3);
  return (
    <div className="summary-box">
      <div className="icon">icon</div>
      <div>{number} suggestions</div>
      <Link to="/Form">
        <button className="feedback-button">+ add feedback</button>
      </Link>
    </div>
  );
}

export default Summary;
