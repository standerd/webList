const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Variable used to set the json write format.
let myList = {
  list: []
};

app.get("/userData", (req, resp) => {
  // read the file content and return the content to the front-end.

  fs.readFile("myList.json", (err, data) => {
    let myData = JSON.parse(data);
    resp.json(JSON.stringify(myData.list));
  });
});

app.post("/addData", (req, resp) => {
  // set the data received from the front-end
  let title = req.body.title;
  let descr = req.body.descr;
  let url = req.body.url;

  // read the current data from the file and assign it to an array.
  // push the received data into the new array and convert to JSON

  fs.readFile("myList.json", (err, data) => {
    myList = JSON.parse(data);
    myList.list.push({ title, descr, url });

    let json = JSON.stringify(myList);

    // write the new array to the file.

    fs.writeFile("myList.json", json, "utf8", err => {
      console.log(err);
    });
  });
  resp.send("Your delete request was received and actioned.");
});

// Delete request to delete an item from the list

app.delete("/", (req, resp) => {
  // set the ID that is received to be deleted

  let id = req.body.id;

  //read the file and add the contents into an array

  fs.readFile("myList.json", (err, data) => {
    let currentList = JSON.parse(data);

    // remove the item with the corrsponding id in the array.

    currentList.list.splice(id, 1);
    let json = JSON.stringify(currentList);

    //write the new array to the file.

    fs.writeFile("myList.json", json, "utf8", err => {
      console.log(err);
    });
  });
  resp.json("Thanks delete request has been received and actioned");
});

app.put("/ammendData", (req, resp) => {
  let title = req.body.title;
  let descr = req.body.descr;
  let url = req.body.url;
  let id = req.body.id;

  fs.readFile("myList.json", (err, data) => {
    let currentList = JSON.parse(data);

    // remove the item with the corrsponding id in the array.

    currentList.list[id] = { title, descr, url };
    let json = JSON.stringify(currentList);

    //write the new array to the file.

    fs.writeFile("myList.json", json, "utf8", err => {
      console.log(err);
    });
  });

  resp.send("Thanks change request has been received and actioned");
});

// example of put request 'http://localhost:3000/?id=1&title=MyNextProject&descr=react and node full stack&url=www.testing123'

app.listen(process.env.PORT || 3001);
