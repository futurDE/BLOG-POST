import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let infoArray = [];
let message = "";
let collectInput = (req, res, next) => {
    message = req.body.UserInput;
    infoArray.push(message);
    console.log(`This is infoArray from collectInput: ${infoArray}`);
    infoArray.forEach((item) => {
        if (item == "" || item == undefined) {
            infoArray.pop(item);
        }
    });
    next();
}

app.use(collectInput);
// app.use(deleteFunction);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req ,res) => {
    if (message != "" && message != undefined) {
        res.render("index.ejs", {
            infoArray: infoArray,
        });
    }
});

app.post("/delete", (req, res) => {
    // for (let i = 0; i < infoArray.length; i++) {
    //     if (i == req.body[`${i}`]) {
    //         infoArray.splice(i, 1);
    //     }
    // }
    // Loop through each key-value pair in req.body
for (let key in req.body) {
    for (let i = 0; i < infoArray.length; i++) {
        if (key == i) {
            infoArray.splice(i, 1);
        }
    }
    console.log(`Name: ${key}, Value: ${req.body[key]}`);
  }

//   for (let i = 0; i < infoArray.length; i++) {
    // for (let key in req.body) {
    //     if (i == req.body[key]) {
    //         infoArray.splice(i, 1);
    //     }
    // }
//   }
  
    
    res.render("index.ejs", {
        infoArray: infoArray,
    });

    console.log(`This is infoArray: ${infoArray}`);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});