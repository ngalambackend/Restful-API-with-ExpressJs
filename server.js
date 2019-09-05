const express = require('express');
const app = express();
const PORT = 3003;

/* ROUTER */
const ArticlesRouter = require('./routers/ArticlesRouter');

// Parse incoming requests data
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello'));
app.use('/articles', ArticlesRouter);

app.listen(PORT, () => console.log(`Example app listening on port ` + PORT));