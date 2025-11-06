import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('SkinSync API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});