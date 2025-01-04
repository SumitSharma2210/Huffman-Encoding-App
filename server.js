const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer(); // Multer instance for in-memory file processing

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Route to handle file upload, process, and respond
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const fileContent = req.file.buffer.toString("utf-8"); // Get file content as a string

    // Process the file content (Huffman encoding/compression logic)
    const compressedContent = huffmanEncode(fileContent);

    // Send the compressed file as a download
    res.set({
      "Content-Disposition": `attachment; filename="compressed.txt"`,
      "Content-Type": "text/plain",
    });
    res.send(compressedContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during processing");
  }
});

// Example Huffman encoding function (replace this with your actual logic)
function huffmanEncode(content) {
  // TODO: Implement your Huffman encoding logic here
  return `Compressed version of:\n\n${content}`;
}

// Start the server on the provided port or 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
