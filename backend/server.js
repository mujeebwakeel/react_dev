import express from "express"
import history from "connect-history-api-fallback";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import cors from "cors";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.message));

const app = express();
app.use(history()); 
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("*", function(req,res) {
        res.send(express.static(path.join(__dirname, '../frontend/build/index.html')))
    });

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get("*", function(req,res) {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}



app.listen(port, () => {
    console.log("The backend server has started");
})