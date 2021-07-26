const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({
    extended: false
}));

const dbUrl = "mongodb+srv://Dotenv:c1lV1hdec67NExaf@cluster0.29fvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tickets: {
        type: Number,
        required: true,
        default: 0
    },
    cost: {
        type: Number,
        required: true,
    }
});


const dbModel = mongoose.model("customer", dbSchema);



app.set("view engine", "ejs");


app.get("/", async(req, res) => {
    const dbMainData = await dbModel.find();
    res.render("index.ejs", {
        dbMainData: dbMainData
    });
});

app.post("/", async(req, res) => {
    await dbModel.create({
        name: req.body.cusName,
        tickets: req.body.ticketsNumber,
        cost: req.body.ticketsNumber * 560
    });
    res.redirect("/");
});

app.listen(5000);
