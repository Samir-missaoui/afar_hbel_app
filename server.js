const express = require("express");
const ConnectDB = require("./helpers/ConnectDB");

const app = express();
//connect to db
ConnectDB();
//middlewares
app.use(express.json());

//Define Routes
app.use("/register", require("./routes/register"));
// app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/login", require("./routes/login"));
app.use("/post", require("./routes/post"));
app.use("/update", require("./routes/update"));
app.use("/delete", require("./routes/delete"));
app.use("/search", require("./routes/search"));
app.use("/favori", require("./routes/favoris"));
app.use("/message", require("./routes/message"));
app.use("/notification", require("./routes/notification"));
// rendering the front end
console.log(__dirname + "/frontend-app" + "/build" + "/index.html");
app.use(express.static(__dirname + "/frontend-app" + "/build"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/frontend-app" + "/build" + "/index.html");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
