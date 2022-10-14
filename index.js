const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require("./config/keys")
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();

app.use(
    bodyParser.urlencoded(
        { extended: false }
    )
)

app.use(bodyParser.json())

app.use(cors({origin:true,credential:true}))

mongoose.connect(keys.mongoURI)
    .then(console.log("DB Connected"))
    .catch(err => console.log(err))

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));




