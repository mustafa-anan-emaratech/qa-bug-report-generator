const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "public");

app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
    res.sendFile(
        path.join(publicDirectory, "index.html")
    );
});


app.listen(PORT, () => {
    console.log(
        `QA Bug Report Generator running at http://localhost:${PORT}`
    );
});
