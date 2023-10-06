const express = require('express');
const routes = require("./routes/routes");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const cors = require("cors");
const app = express();
const port = 8000;



app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the client
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
