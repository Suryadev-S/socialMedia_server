const express = require('express');
const routes = require("./routes/routes");


const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;




app.use(cors({
    origin: '*', // Allow requests from the client if in local machine -http://localhost:5173
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
