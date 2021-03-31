import express from "express";
import { indexRouter } from "./routes/index";
import { authRouter} from "./routes/auth";
import cookieSession from "cookie-session";
import { passport } from "./services/passport-service";

const app = express();
app.use(cookieSession({ maxAge: 30*23*60*60*1000, keys: [process.env.COOKIE_KEY!]}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({type: "*/*"}));

app.use(indexRouter);
app.use(authRouter);

app.get("*", (req, res) => {
    res.status(400).send({errors: [{ message: "not found" }]});
})

export { app }