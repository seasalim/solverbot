window.onload = function () {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const commentaryElement = document.getElementById('commentary');
    const blockSize = 20; // Size of each block in the maze
    const cell_colors = ['white', 'black', 'green']; // colors of cell types

    // Fetch and render the maze data every second
    setInterval(() => {
        fetch('/api/maze/get_all')
            .then(response => response.json())
            .then(data => {
                canvas.width = data.size * blockSize;
                canvas.height = data.size * blockSize;

                commentaryElement.style.width = `${canvas.width}px`;
                commentaryElement.textContent = data.commentary;

                data.cells.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if ((x == data.player.x) && (y == data.player.y))
                            ctx.fillStyle = 'blue';
                        else
                            ctx.fillStyle = cell_colors[cell];
                        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                    });
                });
            });
    }, 1000);
}
