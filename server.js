const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Maze class import
const Maze = require('./maze');

// Internal state
const maze = new Maze();

// BOT command endpoint
app.post('/command', (req, res) => {
    const command = req.body.command;
    const parameter = req.body.parameter;
    const commentary = req.body.commentary;

    switch (command) {
        case 'look':
            console.log("Looking");
            var msg = maze.look();
            res.json({ message: msg });
            break;
        case 'generate':
            console.log('Generating maze', parameter);
            if (parameter != undefined && parameter != null) {
                var msg = maze.generate(parseInt(parameter));
                res.json({ message: msg });
            } else {
                res.status(400).json({ error: 'Invalid parameter for generate command' });
            }
            break;
        case 'move':
            console.log('Moving', parameter);
            if (parameter != undefined && parameter != null) {
                var msg = maze.move(parameter.toString());
                res.json({ message: msg });
            } else {
                res.status(400).json({ error: 'Invalid parameter for move command' });
            }
            break;
        default:
            res.status(400).json({ error: 'Invalid command' });
            break;
    }

    if (commentary != undefined && commentary != null)
        maze.set_commentary(commentary);
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
