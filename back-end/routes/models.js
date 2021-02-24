const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongo = require("mongodb");
const { strictEqual } = require("assert");
const url = "mongodb://localhost:27017/whatsappClone";
var upload = multer();
router.post("/get-login-info", upload.none(), (req, res) => {
  mongo.connect(url, (err, client) => {
    strictEqual(null, err);
    let data = {
      number: req.body.number,
      username: req.body.username,
      contacts: [],
    };
    let db = client.db("whatsappClone");
    let dataToSendBack;
    db.collection("users").findOne({ number: data.number }, (err, result) => {
      if (result == null) {
        if (data.number != 0) {
          db.collection("users").insertOne(data, (err, result) => {
            client.close();
            dataToSendBack = data;
          });
          return;
        }
        client.close();
        dataToSendBack = result;
        return;
      }
      client.close();
      dataToSendBack = result;
      return res.send(dataToSendBack);
    });
  });
});

router.get("/", (req, res) => {
  res.json("hello");
});

module.exports = router;
