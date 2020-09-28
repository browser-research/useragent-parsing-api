const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv');
const express = require('express');
const parser = require('ua-parser-js');

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/parse', (req, res) => {
    data = req.body;

    if (process.env.SECRET == data.secret) {
        if (data.useragent) {
            res.send(parser(data.useragent));
        } else {
            res.status(400);
            res.send("Cannot find useragent in JSON");
        }
    } else {
        res.status(400);
        res.send("Incorrect secret key");
    }
});

app.get('/ping', (req, res) => res.send("Service is operational"));

app.listen(process.env.PORT, () => console.log(`Application avaliable at http://127.0.0.1:${process.env.PORT}`));