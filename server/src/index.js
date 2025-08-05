// https://www.db-fiddle.com/f/xjRxUSxQHR1qDCMx8oE8vM/14
// Countries API
// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
// Importing our Node modules
import express from "express"; // The framework that lets us easily build a web server
import pg from "pg"; // pg stands for PostgreSQL, for talking to the database
import config from "./config.js"; // we need access to our database connection credentials
// connect to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: config.databaseUrl, // credentials to access the database — keep this private!
  ssl: true, // we will use SSL encryption when connecting to the database
});
const app = express(); // Creating an instance of the express module
app.use(express.json()); // This server will receive and respond in JSON format
const port = 3000; // Declaring which port to listen to to receive requests
// Turning on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------
// Helper function for /get-all-suggestions

async function getAllSuggestions() {
  const result = await db.query("SELECT * FROM suggestions");
  console.log(result);
  return result.rows;
}

// Helper function for /add-one-suggestion
async function addOneSuggestion(submission) {
  //await result of database query
  await db.query(
    //sql query inserting vals into suggestion
    "INSERT INTO suggestions (user_name, suggestion_title, suggestion_text, tag) VALUES ($1, $2, $3, $4)",
    //
    [
      submission.user_name,
      submission.suggestion_title,
      submission.suggestion_text,
      submission.tag,
    ]
  );
}

//HELPER function for /get-all-tags
async function getAllTags() {
  const result = await db.query("SELECT * FROM tags");
  console.log(result);
  return result.rows;
}

// Helper function for /add-one-tag
async function addOneTag(tag) {
  //await result of database query
  await db.query(
    //sql query inserting vals into country
    "INSERT INTO tags (label) VALUES ($1)",
    //
    [tag.label]
  );
}
/*
// Helper function for /update-one-country
async function updateOneCountry(country_name) {
  //sets fields we're inputting / changing
  const result = await db.query(
    `
    INSERT INTO country_counts (country_name, count)
    VALUES ($1, 1)
    ON CONFLICT (country_name)
      DO UPDATE SET count = country_counts.count + 1
    RETURNING count;
    `,
    [country_name]
  );
  return result.rows[0].count;
}

//helper function for get-saved-countries
async function getSavedCountries() {
  const result = await db.query("SELECT * FROM saved_countries");
  console.log(result);
  return result.rows;
}
*/
// ---------------------------------
// API Endpoints
// ---------------------------------
// GET /get-all-suggestions
app.get("/get-all-suggestions", async (req, res) => {
  const allSuggestions = await getAllSuggestions();
  // res.send(JSON.stringify(allCountries));
  res.json(allSuggestions);
});

// POST /add-one-suggestion
app.post("/add-one-suggestion", async (req, res) => {
  //country is pulled from request body and saved here
  const newSuggestion = req.body;
  //try running addOneCountry
  try {
    await addOneSuggestion(newSuggestion);
    //if it works, display Country Added
    res.json({ success: true, message: "Suggestion added." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});

app.get("/get-all-tags", async (req, res) => {
  const allTags = await getAllTags();
  res.json(allTags);
});

// POST /add-one-tag
app.post("/add-one-tag", async (req, res) => {
  //country is pulled from request body and saved here
  const newTag = req.body;
  //try running addOneCountry
  try {
    await addOneTag(newTag);
    //if it works, display Country Added
    res.json({ success: true, message: "Tag added." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});
