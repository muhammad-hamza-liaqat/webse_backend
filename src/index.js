require("dotenv").config()
require("./config/connection.mongoose");

const express = require("express")
const cors = require("cors")


const corsOptions = require("./config/corsSetting")
const requestLogger = require("./middleware/requestLogger")
const routes = require("./routes/index")

const app = express()

const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use(requestLogger)
app.use(cors(corsOptions))
app.use("/api", routes)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
