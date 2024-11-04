/*** CONSTANT ***/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const CORLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white'
];

const BRICK_LAYOUT = [
    [
    [
        [1, 7, 7],
        [1, 1, 1],
        [7, 7, 7],
    ],
    [
        [7, 1, 1],
        [7, 1, 7],
        [7, 1, 7],
    ],
    [
        [7, 7, 7],
        [1, 1, 1],
        [7, 7, 1],
    ],
    [
        [7, 1, 7],
        [7, 1, 7],
        [1, 1, 7],
    ],
    ],
    [
    [
        [7, 1, 7],
        [7, 1, 7],
        [7, 1, 1],
    ],
    [
        [7, 7, 7],
        [1, 1, 1],
        [1, 7, 7],
    ],
    [
        [1, 1, 7],
        [7, 1, 7],
        [7, 1, 7],
    ],
    [
        [7, 7, 1],
        [1, 1, 1],
        [7, 7, 7],
    ],
    ],
    [
    [
        [1, 7, 7],
        [1, 1, 7],
        [7, 1, 7],
    ],
    [
        [7, 1, 1],
        [1, 1, 7],
        [7, 7, 7],
    ],
    [
        [7, 1, 7],
        [7, 1, 1],
        [7, 7, 1],
    ],
    [
        [7, 7, 7],
        [7, 1, 1],
        [1, 1, 7],
    ],
    ],
    [
    [
        [7, 1, 7],
        [1, 1, 7],
        [1, 7, 7],
    ],
    [
        [1, 1, 7],
        [7, 1, 1],
        [7, 7, 7],
    ],
    [
        [7, 7, 1],
        [7, 1, 1],
        [7, 1, 7],
    ],
    [
        [7, 7, 7],
        [1, 1, 7],
        [7, 1, 1],
    ],
    ],
    [
    [
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
        [7, 7, 7, 7],
    ],
    [
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
    ],
    [
        [7, 7, 7, 7],
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
    ],
    [
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
    ],
    ],
    [
    [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
    ],
    [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
    ],
    [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
    ],
    [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
    ],
    ],
    [
    [
        [7, 1, 7],
        [1, 1, 1],
        [7, 7, 7],
    ],
    [
        [7, 1, 7],
        [7, 1, 1],
        [7, 1, 7],
    ],
    [
        [7, 7, 7],
        [1, 1, 1],
        [7, 1, 7],
    ],
    [
        [7, 1, 7],
        [1, 1, 7],
        [7, 1, 7],
    ],
    ],
];

const WHITE_COLOR_ID = 7;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
    }

    generateWhiteBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(x,y,colorId) {
        this.ctx.fillStyle = CORLOR_MAPPING[colorId] || CORLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(x * BLOCK_SIZE,y * BLOCK_SIZE, BLOCK_SIZE,BLOCK_SIZE)
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, WHITE_COLOR_ID);
            }
        }
    }
}

class Brick {
    contructor(id) {
        this.id = id;
        this
    }
}

let board = new Board(ctx);
board.drawBoard();

console.log(board.grid);