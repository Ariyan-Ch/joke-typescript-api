import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

interface Joke {
    type: string;
    joke?: string;
    setup?: string;
    delivery?: string;
}

app.get('/joke', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<Joke>('https://v2.jokeapi.dev/joke/Any');
        const joke = response.data;

        if (joke.type === 'single') {
            res.send(`<h1>${joke.joke}</h1>`);
        } else if (joke.type === 'twopart') {
            res.send(`<h1>${joke.setup}</h1><p>${joke.delivery}</p>`);
        } else {
            res.status(500).send('Unexpected joke format');
        }
    } catch (error) {
        res.status(500).send('Error fetching joke');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
