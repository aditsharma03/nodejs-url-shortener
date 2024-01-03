const path = require("path");

const express = require("express");

const {connectToMongoDB} = require("./connect");



const cookieParser = require("cookie-parser");

const { restrictToLoggedInUsersOnly, checkAuth } = require("./middlewares/auth");




const staticRoute = require("./routes/staticRoutes");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");




connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("\nMongoDB connected!!"));





const PORT = 8001;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



app.use("/url", restrictToLoggedInUsersOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);



app.listen(PORT, ()=>console.log(`\nlistening on port ${PORT}`));