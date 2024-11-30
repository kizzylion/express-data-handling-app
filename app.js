const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Express app listen on PORT 3000");
});
