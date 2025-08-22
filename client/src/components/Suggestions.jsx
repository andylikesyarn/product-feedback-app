import { useState, useEffect } from "react";
import "./Comps.css";

function Suggestions({ suggestions }) {
  /*const [suggestions, setSuggestions] = useState([
    {
      suggestion_id: 1,
      user_name: "Andy",
      suggestion_title: "unrealistic suggestion 1",
      suggestion_text: "you should change everything",
      tag: "general",
    },
    {
      suggestion_id: 2,
      user_name: "Bill",
      suggestion_title: "unrealistic suggestion 2",
      suggestion_text: "you should change nothing",
      tag: "general",
    },
  ]);*/

  return (
    <>
      <div className="suggestion-box">
        {suggestions && suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div className="suggestion-card" key={suggestion.suggestion_id}>
              <h3>{suggestion.suggestion_title}</h3>
              <p>{suggestion.suggestion_text}</p>
              <p>left by {suggestion.user_name}</p>
              <button>{suggestion.tag}</button>
            </div>
          ))
        ) : (
          <div className="no-suggestions">No suggestions yet.</div>
        )}
      </div>
    </>
  );
}

export default Suggestions;
