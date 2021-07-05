class Grid
{
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.grid = Tools.create2DArray(row, col);
    }

    checkNeighbors(x, y, grid) {
        let neighbotCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                let X = (x + dx) % this.col;
                let Y = (y + dy) % this.row;
                //console.log(grid[y + dy][x + dx]);
                if (grid[Y][X] === 1)
                    neighbotCount++;
            }
        }
        neighbotCount -= grid[y][x];

        return neighbotCount;
    }

    create2DArray(row, col) {
        let array = new Array(row);
        for (let i = 0; i <= row; i++) {
            array[i] = new Array(col);
        }
        
        return array;
        //return 44;
    }

    update() {
        let next = this.create2DArray(this.row, this.col);
        //console.log(prev === this.grid);
        for (let y = 1; y < row; y++) {
            for (let x = 1; x < col; x++) {
                let state = this.grid[y][x];
                let neighborCount = this.checkNeighbors(x, y, this.grid);
                let neighbors = this.checkNeighbors(x, y, this.grid);
                //console.log(neighborCount);

                //this.grid[y][x] = !prev[y][x];
                
                if (state == 0 && neighbors == 3) {
                    next[y][x] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[y][x] = 0;
                } else {
                    next[y][x] = state;
                }

                // if (x === 25 && y === 24)
                //     console.log( { prev: prev[y][x], next: this.grid[y][x], neightbor: neighborCount });
                //console.log(prev === this.grid);

                // if (prev[y][x] === 1) {
                //     if (neighborCount === 2 || neighborCount === 3) {
                //         continue;
                //     } else {
                //         this.grid[y][x] = 0;
                //     }
                // } else {
                //     if (neighborCount === 3) {
                //         this.grid[y][x] = 1;
                //     }
                // }
            }
        }

        this.grid = next;
    }

}