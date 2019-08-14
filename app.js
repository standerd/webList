const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, resp) => {});

app.listen(PORT);
