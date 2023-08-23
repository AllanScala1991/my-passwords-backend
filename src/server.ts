import express from "express";
import cors from "cors";

const app = express();
const port = parseInt(`${process.env.PORT}`) || 3000;

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

const server = app.listen(port, "127.0.0.1", () => {
  const ip: any = server.address();
  console.log(`Server is running in PORT: ${ip.address}:${port}`)
})
