const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/types", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "types.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "about.html"));
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "not-found.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  