import { useState, useEffect } from "react";
import "./index.css";
import Tags from "./components/Tags";
import Suggestions from "./components/Suggestions";
import Info from "./components/Info";
import Summary from "./components/Summary";

function Home() {
  const [savedSuggestions, setSavedSuggestions] = useState([]);
  useEffect(() => {
    const fetchSavedSuggestions = async () => {
      try {
        const response = await fetch(
          "/api/get-all-suggestions", //specify correct endpoint
          {
            method: "GET", //specify method
          }
        );
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        //set data == to response
        setSavedSuggestions(data);
        //  set saved countries set == to data.
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSavedSuggestions();
    //run function
  }, []); //no dependencies.
  console.log(savedSuggestions);

  return (
    <>
      <h1>Product Feedback Full-Stack App</h1>
      <Summary className="summary-comp" />
      <Info className="info-comp" />
      <Tags
        suggestions={savedSuggestions}
        setSuggestions={setSavedSuggestions}
        className="tag-comp"
      />
      <Suggestions suggestions={savedSuggestions} className="suggestion-comp" />
    </>
  );
}

export default Home;
