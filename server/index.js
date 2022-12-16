const fsp = require("fs").promises;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const logger = require("./middleware/logger");
//routers
const AuthRoute = require("./Routes/AuthRoute");
const UserRoute = require("./Routes/UsersRoute");
const BooksRoute = require("./Routes/BooksRoute");
//env config
dotenv.config();
// app declaration
const app = express();
//middlewares
// json parser
app.use(express.json());
// morgan log trafic to console dev only
app.use(morgan("tiny"));
// cors config
app.use(cors());
// log trafic to serverLogs.txt file
app.use(logger);
//routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/Books", BooksRoute);
// static route to server home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Pages", "index.html"));
});
//connection
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8000;
// db connection
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port http://localhost:${PORT}`);
      fsp.appendFile(
        path.join(__dirname, "serverLogs.txt"),
        `server is running on port http://localhost:${PORT} \n`,
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    })
  )
  .catch((error) => console.log(`${error} did not connect`));
