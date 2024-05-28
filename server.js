const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Maze = require('./maze');

app.use(bodyParser.json());

// Internal state
let maze = new Maze();

// BOT command endpoint
app.post('/command', (req, res) => {
    const { command, parameter, commentary } = req.body;

    switch (command) {
        case 'look':
            console.log('Looking');
            res.json({ message: maze.look() });
            break;
        case 'generate':
            if (!parameter || typeof parseInt(parameter) !== 'number') {
                res.status(400).json({ error: 'Invalid parameter for generate command' });
                return;
            }
            console.log(`Generating maze with ${parameter} cells`);
            res.json({ message: maze.generate(Number(parameter)) });
            break;
        case 'move':
            if (!parameter || typeof parameter !== 'string') {
                res.status(400).json({ error: 'Invalid parameter for move command' });
                return;
            }
            console.log(`Moving to ${parameter}`);
            res.json({ message: maze.move(parameter) });
            break;
        default:
            res.status(400).json({ error: 'Invalid command' });
    }

    if (commentary) {
        maze.set_commentary(commentary);
    }
});

// UI endpoint
app.get('/api/maze/get_all', (req, res) => {
    res.json(maze.get_all());
});

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});