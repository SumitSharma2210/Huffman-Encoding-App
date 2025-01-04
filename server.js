const express = require("express");
const path = require("path");
const app = express();

// Serve the style.css file from the public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Route to serve index.html and other JS files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve other JS files (heap.js, huffman.js, script.js) from the root
app.get("/heap.js", (req, res) => {
  res.sendFile(path.join(__dirname, "heap.js"));
});

app.get("/huffman.js", (req, res) => {
  res.sendFile(path.join(__dirname, "huffman.js"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
