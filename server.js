const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer();

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const fileContent = req.file.buffer.toString("utf-8");

    const compressedContent = huffmanEncode(fileContent);

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

function huffmanEncode(content) {
  return `Compressed version of:\n\n${content}`;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
