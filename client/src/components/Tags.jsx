import { useState, useEffect } from "react";
import "./Comps.css";

function Tags() {
  const [tags, setTags] = useState([
    { tag_id: 1, label: "label1" },
    { tag_id: 2, label: "label2" },
  ]);

  return (
    <>
      <div className="tag-box">
        {tags.map((tag, index) => (
          <button className="tag-button" key={index}>
            {tag.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default Tags;
