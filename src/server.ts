import express from "express";
import "dotenv/config";

const app = express();
const port = parseInt(`${process.env.PORT}`) || 3000;

app.use(express.json());

//ROUTES
app.use(require("./routes/user/user.route"));

app.listen(port, () => {
    console.log(`Server is running in PORT: ${port}`)
})