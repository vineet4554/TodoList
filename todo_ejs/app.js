const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {Item} = require("./models/item.js");

app.set("view engine", "ejs");
const methodOverride = require("method-override");
app.use(methodOverride("_method")); 

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
    console.log("Connection successful");
    const existingItems = await Item.find({});
    if (existingItems.length === 0) {
      let work = [
        { work: "Eat" },
        { work: "Sleep" },
        { work: "walk" }
      ];
      await Item.insertMany(work);
      console.log("Items inserted successfully");
    }


  

  } catch (err) {
    console.error("Error:", err);
  }
}

main();

app.get("/", async (req, res) => {
  let date = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = date.toLocaleDateString("en-US", options);

  try {
    const works = await Item.find({});
    res.render("lists", {
      listTitle: day,
      item: works
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading chats");
  }
});

app.get("/work", async (req, res)=> {
      try {
    const works = await Item.find({});
    res.render("lists", {
      listTitle: "Worklist",
      item: works
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading chats");
  }
});
app.post("/", async (req, res) => {
  try {
    let work = req.body.item;

    if (work.trim() !== "") {
      if (req.body.list === "Work List") {
        workitem.push(work);
        res.redirect("/work");
      } else {
        await Item.create({ work: work });
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.send("Error sending message");
  }
});
app.delete("/:id",async(req,res)=>{
  try{
    let {id}=req.params;
    await Item.findByIdAndDelete(id); 
    res.redirect("/");
  }
  catch (err) {
    console.error(err);
    res.send("Error sending message");
  }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
