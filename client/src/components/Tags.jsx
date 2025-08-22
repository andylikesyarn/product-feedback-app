import { useState, useEffect } from "react";
import "./Comps.css";

function Tags({ suggestions, setSuggestions }) {
  const [tags, setTags] = useState([
    { tag_id: 1, label: "label1" },
    { tag_id: 2, label: "label2" },
  ]);

  const handleTagClick = async (label) => {
    try {
      const response = await fetch(
        `/api/get-one-tag/${encodeURIComponent(label)}`
      );
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await fetch(
          "/api/get-all-tags", //specify correct endpoint
          {
            method: "GET", //specify method
          }
        );
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        //set data == to response
        setTags(data);
        //  set saved countries set == to data.
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchAllTags();
    //run function
  }, []); //no dependencies.
  console.log(tags);
  return (
    <>
      <div className="tag-box">
        {tags.map((tag) => (
          <button
            className="tag-button"
            key={tag.tag_id}
            onClick={() => handleTagClick(tag.label)}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default Tags;
