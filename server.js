const express = require('express')
const app = express()
const PORT = 3003;

const ArticlesRouter = require('./routers/ArticlesRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello'));
app.use('/articles', ArticlesRouter);

app.listen(PORT, () => console.log(`Example app listening on port ` + PORT));