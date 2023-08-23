import express from "express";
import cors from "cors";

const app = express();
const port = parseInt(`${process.env.PORT}`) || 8002;

const whitelist = [process.env.LOCALHOST]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());

//ROUTES
app.use(require("./routes/user/user.route"));
app.use(require("./routes/login/login.route"));
app.use(require("./routes/password/password.route"));

app.listen(port, () => {
    console.log(`Server is running in PORT: ${port}`)
})
