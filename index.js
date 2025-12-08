import express from "express"
import dotenv from "./configs/dotenv.js";
import router from "./router/index.js";
import db from "./configs/db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

const app = express();
const port = dotenv.PORT || 3001;

app.set('view engine','ejs');
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    secret : 'secret-key',
    resave : false,
    saveUninitialized : true
}));
app.use(flash());

app.use('/',router)

app.listen(port,(error) => {
    if(!error){
        console.log("server started.");
        console.log('http://localhost:'+port)
    }
})