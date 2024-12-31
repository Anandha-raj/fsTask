const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, "files");

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post("/create-file", (req, res) => {
  const currentDateTime = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${currentDateTime}.txt`;
  const filePath = path.join(folderPath, fileName);

  const fileContent = new Date().toString();
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating file" });
    }
    res.status(200).json({ message: "File created", fileName });
  });
});

// Endpoint to retrieve all text files in the folder
app.get("/get-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading files" });
    }
    const textFiles = files.filter((file) => file.endsWith(".txt"));
    res.status(200).json({ files: textFiles });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
