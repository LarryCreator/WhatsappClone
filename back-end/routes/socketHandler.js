const ioHandler = (io) => {
  const mongo = require("mongodb");
  const { strictEqual } = require("assert");
  const url = "mongodb://localhost:27017/whatsappClone";
  io.on("connection", (socket) => {
    console.log("New connection");
    socket.emit("connected", socket.id);
    socket.on("private-msg", (data, number, your) => {
      mongo.connect(url, (err, client) => {
        strictEqual(null, err);
        let db = client.db("whatsappClone");
        db.collection("users").findOne(
          { number: number, "contacts.number": your.number },
          (err, result) => {
            strictEqual(null, err);
            if (result == null) {
              db.collection("users").findOneAndUpdate(
                { number: number },
                {
                  $push: {
                    contacts: {
                      name: your.username,
                      number: your.number,
                      messages: [],
                    },
                  },
                }
              );
            }
            db.collection("users").findOneAndUpdate(
              { number: number, "contacts.number": your.number },
              {
                $push: {
                  "contacts.$.messages": { msg: data.msg, type: "theirs" },
                },
              }
            );
            db.collection("users").findOneAndUpdate(
              { number: your.number, "contacts.number": number },
              {
                $push: {
                  "contacts.$.messages": { msg: data.msg, type: "yours" },
                },
              }
            );
            console.log("private-message");
            io.emit("update-view", data, number, your.number, your.username);
          }
        );
      });
      //store msg on the database
    });
    //this signal comes from whatsappclone component
    socket.on("newcontact", (numberyouadding, yournumber, messages) => {
      mongo.connect(url, (err, client) => {
        strictEqual(null, err);
        let db = client.db("whatsappClone");
        //checking if the sender's number is already in the receiver's contact list. If so,
        //stop the function.
        db.collection("users").findOne(
          { number: yournumber, "contacts.number": numberyouadding },
          (err, result) => {
            strictEqual(err, null);
            if (result != null) {
              //this signal is only emitted from here if you're receiving a message from someone that
              //is not in your contact list yet
              socket.emit(
                "update-contact-view",
                result.contacts[0].name,
                result.contacts[0].number,
                messages
              );
              client.close();
              return;
            }
            db.collection("users").findOne(
              { number: numberyouadding },
              (err, result) => {
                strictEqual(err, null);
                if (result == null) {
                  console.log("this number does not exist in our database");
                  client.close();
                  return;
                }
                let data = {
                  name: result.username,
                  number: numberyouadding,
                  messages: [],
                };
                db.collection("users").findOneAndUpdate(
                  { number: yournumber },
                  { $push: { contacts: data } }
                );
                client.close();
                //this signal is only emitted from here if you're adding the contact via the
                //add new contact in the view
                socket.emit(
                  "update-contact-view",
                  data.name,
                  data.number,
                  messages
                );
              }
            );
          }
        );
      });
    });
    socket.on("disconnect", () => {
      console.log("Minus one connection");
    });
  });
};

module.exports = ioHandler;
