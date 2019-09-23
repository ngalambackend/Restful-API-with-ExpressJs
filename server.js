const express = require('express');
const app = express();
const PORT = 3003;
const cors = require('cors');

// allow request
app.use(cors());

/* ROUTER */
const ArticlesRouter = require('./routers/ArticlesRouter');

// Parse incoming requests data
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World'));
app.use('/articles', ArticlesRouter);

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));