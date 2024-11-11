const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("Mongodb connected"));

// Routes
const urlRoute = require("./Routes/url");
const staticRoute = require('./Routes/staticRouter');
const userRoute = require('./Routes/user');

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Use routes
app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use('/user', userRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    console.log("entry is ", entry);
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
