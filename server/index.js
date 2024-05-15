// Import required modules
const express = require("express");

// Create an Express application
const app = express();

// Define a route to handle GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Hello From Flex Labs!!!!!!!");
});

// Define a route to handle GET requests to /api/data
app.get("/api/data", (req, res) => {
  // Sample data
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  // Send the data as JSON response
  res.json(data);
});

// Define the port number for the server
const PORT = process.env.PORT || 3001;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
