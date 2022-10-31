import express from 'express';

const port = 3000

const app = express();

app.use(express.static('public'));

app.get('/foo', (req, res) => { res.send('Hello Foo!') });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})