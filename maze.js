// maze.js - Maze generation

const CellType = {
    FLOOR: 0,
    WALL: 1,
    EXIT: 2
};

class Maze {
    constructor() {
        this.size = 0;
        this.cells = [];
        this.player = { x: 0, y: 0 };
        this.commentary = "Starting...";
    }

    set_commentary(msg) {
        this.commentary = msg;
    }

    generate(size) {
        this.size = size;
        this.cells = Array(size).fill().map(() => Array(size).fill(CellType.WALL));

        var visited = Array(size).fill().map(() => Array(size).fill(0));
        var stack = [];
        var currCell = [1, 1]; // [y, x]

        stack.push(currCell);

        while (stack.length > 0) {
            currCell = stack.pop();
            var [cy, cx] = currCell;
            visited[cy][cx] = 1;
            this.cells[cy][cx] = CellType.FLOOR;

            var neighbours = [];
            var deltas = [[0, 2], [2, 0], [0, -2], [-2, 0]]; // right, down, left, up

            for (var delta of deltas) {
                var ny = cy + delta[0];
                var nx = cx + delta[1];

                if (ny >= 0 && ny < size && nx >= 0 && nx < size && visited[ny][nx] == 0) {
                    neighbours.push([ny, nx]);
                }
            }

            if (neighbours.length > 0) {
                var removed = neighbours.splice(Math.floor(Math.random() * neighbours.length), 1)[0];

                // Remove the adjoining wall
                var wall = [(removed[0] + cy) / 2, (removed[1] + cx) / 2];
                this.cells[wall[0]][wall[1]] = CellType.FLOOR;

                if (neighbours.length > 0)
                    stack.push(currCell);

                stack.push(removed);
            }
        }

        this.placeItems();
        this.placePlayer();

        return this.look();
    }

    get_all() {
        return { size: this.size, cells: this.cells, player: this.player, commentary: this.commentary };
    }

    move(direction) {
        var [dx, dy] = [0, 0];

        switch (direction.toUpperCase()) {
            case 'NORTH':
                if (this.player.y > 0)
                    dy = -1;
                break;
            case 'SOUTH':
                if (this.player.y < (this.size - 1))
                    dy = 1;
                break;
            case 'WEST':
                if (this.player.x > 0)
                    dx = -1;
                break;
            case 'EAST':
                if (this.player.x < (this.size - 1))
                    dx = 1;
                break;
        }

        if (this.cells[this.player.y + dy][this.player.x + dx] != CellType.WALL) {
            this.player.x += dx;
            this.player.y += dy;

            console.log(`Player move`, dx, dy);
        } else {
            console.log('Invalid move attempted');
            return {
                coordinates: this.player,
                description: "Invalid move! You cannot move " + direction + ".",
            }
        }

        return this.look();
    }

    look() {
        return {
            coordinates: this.player,
            description: this.description(),
        };
    }

    description() {
        const deltas = [[0, 1, 'east'], [1, 0, 'south'], [0, -1, 'west'], [-1, 0, 'north']]; // east, south, west, north
        const cellNames = ['passageway', 'wall', 'exit'];
        var msg = '';

        if (this.cells[this.player.y][this.player.x] == CellType.EXIT) {
            msg = 'You are at the exit! No more moves allowed.'
        } else {
            for (var delta of deltas) {
                var ny = this.player.y + delta[0];
                var nx = this.player.x + delta[1];

                if (ny >= 0 && ny < this.size && nx >= 0 && nx < this.size) {
                    if (this.cells[ny][nx] != CellType.WALL) {
                        msg += 'There is a ' + cellNames[this.cells[ny][nx]] + ' to the ' + delta[2] + '. ';
                    }
                }
            }
        }

        return msg;
    }

    placeItems() {
        var placements = {
            placedExit: { current: 0, max: 1, symbol: CellType.EXIT },
        };

        while (Object.values(placements).some(place => place.current < place.max)) {
            var cell = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
            if (this.cells[cell[0]][cell[1]] == CellType.FLOOR) {
                for (var key in placements) {
                    if (placements[key].current < placements[key].max) {
                        this.cells[cell[0]][cell[1]] = placements[key].symbol;
                        placements[key].current++;
                        break;
                    }
                }
            }
        }
    }

    placePlayer() {
        while (true) {
            var cell = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
            if (this.cells[cell[0]][cell[1]] == CellType.FLOOR) {
                this.player.x = cell[1];
                this.player.y = cell[0];
                break;
            }
        }
    }
}

module.exports = Maze;