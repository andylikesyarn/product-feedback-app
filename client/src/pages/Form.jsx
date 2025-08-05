import { useState, useEffect } from "react";
import "../components/Comps.css";
import { BrowserRouter, Link } from "react-router-dom";

function Form() {
  const text = "< go back";
  return (
    <div className="feedback-page">
      {" "}
      <Link to="/">
        <button>{text}</button>
      </Link>
      <div className="plus-icon">+</div>
      <div className="feedback-box">
        {" "}
        <h2>Create New Feedback</h2>
        <form>
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
                required
              />
            </div>
          </fieldset>

          <fieldset>
            <div>
              <label htmlFor="label">
                <span>Category</span>:<br /> Choose a category for your
                feedback.
              </label>
              <br />
              <select id="label" name="label">
                <option value="" disabled selected></option>
                <option value="general">General</option>
                <option value="accessibility">Accessibility</option>
                <option value="information request">Information Request</option>
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="suggestion_text">
                {" "}
                <span>Feedback Detail</span>:<br /> Include any specific
                information on what should be improved, added, etc.
              </label>
              <br />
              <input
                type="email"
                id="suggestion_text"
                name="suggestion_text"
                required
              />
            </div>
          </fieldset>

          <Link to="/Form">
            <button>Reset Form</button>
          </Link>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
