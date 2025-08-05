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
    "INSERT INTO suggestions (title, body, tag) VALUES ($1, $2, $3)",
    //
    [submission.title, submission.body, submission.tag]
  );
}


// Helper function for /add-one-tag
async function addOneTag(tag) {
  //await result of database query
  await db.query(
    //sql query inserting vals into country
    "INSERT INTO tags (label) VALUES ($1)",
    //
    [tag.tag]
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

// ---------------------------------
// API Endpoints
// ---------------------------------
// GET /get-all-countries
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers();
  // res.send(JSON.stringify(allCountries));
  res.json(allUsers);
});

// GET /get-latest-user
app.get("/get-latest-user", async (req, res) => {
  const lastUser = await getLatestUser();
  res.json(lastUser);
});

// POST /add-one-country
app.post("/add-one-user", async (req, res) => {
  //country is pulled from request body and saved here
  const newUser = req.body;
  //try running addOneCountry
  try {
    await addOneUser(newUser);
    //if it works, display Country Added
    res.json({ success: true, message: "User added." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /update-one-user
//defining a post request at the endpoint update-one-user
app.post("/update-one-user", async (req, res) => {
  //country categories are pulled from request body and saved here
  const { name, email, country_name, bio } = req.body;
  //run helper function, setting aboce var = to the second argument
  try {
    await updateOneUser(name, { email, country_name, bio });
    //if it works, give country updated
    res.json({ success: true, message: "User updated." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});

// both functions res.send() and res.json() send a response
// res.send() sends a response as a String
// res.json() sends a response as a JSON object
// GET /get-one-country/:name
app.get("/get-one-country/:name", async (req, res) => {
  //countryName = the name pulled from the url param
  const countryName = req.params.name;
  //set country = to the result of the function getOneCountry
  const country = await getOneCountry(countryName);
  //display result of getOneCountry, wich should be an object with all its attributes
  res.json(country);
});

// GET /delete-one-country/:name
app.delete("/delete-one-country/:name", async (req, res) => {
  //deleteCountry = the name pulled from the url param
  const deleteCountry = req.params.name;
  //run function to delete country asynchronously
  await deleteOneCountry(deleteCountry);
  //then return CountryName was deleted
  res.json(`${deleteCountry} was deleted`);

  try {
    await deleteOneCountry(deleteCountry);
    res.json({ success: true, message: "Country deleted." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /add-one-country
app.post("/add-one-country", async (req, res) => {
  //country is pulled from request body and saved here
  const newCountry = req.body;
  //try running addOneCountry
  try {
    await addOneCountry(newCountry);
    //if it works, display Country Added
    res.json({ success: true, message: "Country added." });
  } catch (err) {
    //if it does not work, send error message.
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /update-one-country
//defining a post request at the endpoint update-one-country
app.post("/update-one-country", async (req, res) => {
  const { country_name } = req.body;
  try {
    const count = await updateOneCountry(country_name);
    res.json({ success: true, count });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /get-saved-users
app.get("/get-saved-countries", async (req, res) => {
  const allCountries = await getSavedCountries();
  res.json(allCountries);
});

// -----// GET /get-all-countries
*/
