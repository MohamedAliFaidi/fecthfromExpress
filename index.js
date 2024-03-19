const express = require("express");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.json");

const app = express();

app.use("/", express.static("public"));
app.use(express.json());

app.get("/", (res, req) => {
  res.sendFile("public/index.html");
});

app.get("/get", (req, res) => {
  try {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ message: "server error" });
      }
      // Parse JSON data
      const users = JSON.parse(data);

      // Access the array of users
      const userList = users.users;
      res
        .status(200)
        .json({
          message: " you succeded writing a fetch get request",
          data: userList,
        });
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.post("/post", (req, res) => {
  fs.readFile(filePath,  (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // Parse JSON data
      const users = JSON.parse(data);


      // Add the new user object to the array
      users.users.push(req.body);

      // Convert the updated data back to JSON
      const updatedData = JSON.stringify(users, null, 2);

      // Write the updated JSON data back to the file
      fs.writeFile(filePath, updatedData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("New user added successfully!");
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
  res.status(500).json({ message: "server error" });
});

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
