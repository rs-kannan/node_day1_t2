//Node js imports for File actions
const fs = require("fs");
const express = require("express");
const path = require("path");
const PORT = 9000;

//Define the app as express to run on server
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<h1>"Server is Running / Current Date & Time/Created API"</h1>` 
  );
});
app.get("/current", async (req, res) => {
  try {
    const dateTime = new Date().toString().replace(/:/g, "-");
    const fileName = `${dateTime}.txt`;
    const filePath = path.join(__dirname, "files", fileName);
    fs.writeFileSync(filePath, dateTime);
    res.status(200).json({
      message: `${dateTime} Created Succesfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getFiles", (req, res) => {
  try {
    const folderPath = path.join(__dirname, "files");
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        res.status(500).json({ error: `folder not found` });
        return;
      }
      const textFiles = files.filter((file) => file.endsWith(".txt"));
      res.status(200).json({ files: textFiles });
    });
  } catch (error) {
    res.status(500).json({ error: `try after resolved the error to get` });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on", PORT);
  }
});
