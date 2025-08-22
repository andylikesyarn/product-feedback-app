import { useState } from "react";
import "../components/Comps.css";
import { Link } from "react-router-dom";

function Form() {
  const text = "< go back";

  // State for storing form inputs
  const [formData, setFormData] = useState({
    suggestion_title: "",
    tag: "",
    suggestion_text: "",
  });

  const [suggestion, setSuggestion] = useState(null);

  // Update form state dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const response = await fetch("/api/add-one-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // send the state
      });

      if (!response.ok) throw new Error("Failed to post suggestion");

      const data = await response.json();
      setSuggestion(data); // Store new suggestion in state
      console.log("Suggestion posted:", data);
    } catch (error) {
      console.error("Error posting suggestion:", error);
    }
  };

  return (
    <div className="feedback-page">
      <Link to="/">
        <button>{text}</button>
      </Link>
      <div className="plus-icon">+</div>
      <div className="feedback-box">
        <h2>Create New Feedback</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <label htmlFor="suggestion_title">
                <span>Feedback Title</span>:<br /> A short, descriptive
                headline.
              </label>
              <br />
              <input
                type="text"
                id="suggestion_title"
                name="suggestion_title"
                value={formData.suggestion_title}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <div>
              <label htmlFor="tag">
                <span>Category</span>:<br /> Choose a category for your
                feedback.
              </label>
              <br />
              <select
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
              >
                <option value="" disabled></option>
                <option value="general">General</option>
                <option value="accessibility">Accessibility</option>
                <option value="information request">Information Request</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <label htmlFor="suggestion_text">
                <span>Feedback Detail</span>:<br /> Include specific details.
              </label>
              <br />
              <input
                type="text"
                id="suggestion_text"
                name="suggestion_text"
                value={formData.suggestion_text}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <button
            type="reset"
            onClick={() =>
              setFormData({
                suggestion_title: "",
                tag: "",
                suggestion_text: "",
              })
            }
          >
            Reset Form
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
