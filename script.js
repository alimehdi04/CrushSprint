let board = [];
const candies = ["Red", "Orange", "Blue", "Green", "Yellow", "Purple"];
const rows = 9;
const cols = 9;
let isGameStarted = false;
let score = 0;

let movesLeft = 30;

let currTile;
let trgTile;

document.getElementById("start-btn").addEventListener("click", function() {
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    
    if (!isGameStarted) {
        document.body.classList.add('landing-active');
        score = 0;
        movesLeft = 30;
        startGame();
        isGameStarted = true;
        window.setInterval(function() {
            crushCandy();
            slideCandy();
            generateCandy();
        }, 100);
    }
});

function randomCandy()
{
    return candies[Math.floor(Math.random()*candies.length)];
}

function startGame()
{
    document.getElementById("board").innerHTML = ""; // This will remove all the existing candy images
    board = [];

    document.body.classList.remove('landing-active');
    document.body.classList.add('game-active');

    for(let r = 0; r < rows; r++)
    {
        let row = [];
        for(let c = 0; c < cols; c++)
        {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); //img-id == 0-0
            tile.src = "./images/" + randomCandy() + ".png";//img-src = ./images/Blue.png

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("dragend", dragEnd);
            tile.addEventListener("drop", dragDrop);

            
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart()
{
    currTile = this;
}

function dragOver(e)
{
    e.preventDefault();
}

function dragEnter(e)
{
    e.preventDefault();
}

function dragLeave()
{

}

function dragDrop()
{
    trgTile = this;
}

function dragEnd()
{
    if(currTile.src.includes("blank")||trgTile.src.includes("blank"))
    {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);

    let trgCoords = trgTile.id.split("-");
    let r2 = parseInt(trgCoords[0]);
    let c2 = parseInt(trgCoords[1]);

    let moveleft = c2 == c1-1 && r1 == r2;
    let moveright = c2 ==c1+1 && r1 == r2;

    let moveup = r2 == r1 -1 && c1 == c2;
    let movedown = r2 == r1 +1 && c1 == c2;

    let isAdjacent = moveleft||moveright||moveup||movedown;


    if(isAdjacent)
    {   
        let currImg = currTile.src;
        let trgImg = trgTile.src;
        currTile.src = trgImg;
        trgTile.src = currImg;
        let validMove = checkValid();
        if(!validMove)
        {
            let currImg = currTile.src;
            let trgImg = trgTile.src;
            currTile.src = trgImg;
            trgTile.src = currImg;
        }
        else
        {
            if (movesLeft === 0) {
                endGame();
            }
            movesLeft--;
            document.getElementById("moves").innerText = movesLeft;
        }
    }
}

function crushCandy()
{
    crushFive();
    crushLShape();
    crushTShape();
    crushFour();
    crushThree();
    if(movesLeft == 30) score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("moves").innerText = movesLeft;
}

function crushFive()
{
    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < cols -4; c++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];

            if(candy1.src==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank"))
            {
                candy1.src = candy2.src = candy3.src = candy4.src = candy5.src = "./images/blank.png";
                score += 100;
            }
        }
    }

    for(let c = 0; c < cols; c++)
    {
        for(let r = 0; r < rows -4; r++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];

            if(candy1.src==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank"))
            {
                candy1.src = candy2.src = candy3.src = candy4.src = candy5.src = "./images/blank.png";
                score += 100;
            }
        }
    }
}

function crushFour()
{
    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < cols -3; c++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];

            if(candy1.src==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank"))
            {
                candy1.src = candy2.src = candy3.src = candy4.src = "./images/blank.png";
                score += 60;
            }
        }
    }

    for(let c = 0; c < cols; c++)
    {
        for(let r = 0; r < rows -3; r++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];

            if(candy1.src==candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank"))
            {
                candy1.src = candy2.src = candy3.src = candy4.src = "./images/blank.png";
                score += 60;
            }
        }
    }
}

function crushLShape()
{
    for(let r = 0; r < rows-2; r++)
    {
        for(let c = 0; c < cols-2; c++)
        {
            let candy = board[r][c];
            if(candy.src.includes("blank")) continue;

            if(checkL(r,c,[0,0], [1,0], [2,0], [2,1], [2,2]))
            {
                clearLShape(r,c,[[0,0], [1,0], [2,0], [2,1], [2,2]]);
                score += 75;
            }
            else if(checkL(r,c,[0,0], [0,1], [0,2], [1,2], [2,2]))
            {
                clearLShape(r,c,[[0,0], [0,1], [0,2], [1,2], [2,2]]);
                score += 75;
            }
        }
    }
    for(let r = 0; r < rows-2; r++)
    {
        for(let c = 2; c < cols; c++)
        {
            let candy = board[r][c];
            if(candy.src.includes("blank")) continue;

            if(checkL(r,c,[0,0], [0,-1], [0,-2], [1,-2], [2,-2]))
            {
                clearLShape(r,c,[[0,0], [0,-1], [0,-2], [1,-2], [2,-2]]);
                score += 75;
            }
            else if(checkL(r,c,[0,0], [1,0], [2,0], [2,-1], [2,-2]))
            {
                clearLShape(r,c,[[0,0], [1,0], [2,0], [2,-1], [2,-2]]);
                score += 75;
            }
        }
    }
}

function clearLShape(r, c, coords) {
    coords.forEach(([dr, dc]) => {
        board[r+dr][c+dc].src = "./images/blank.png";
    });
}

function checkL(row, col, ...coords)
{
    let candy = board[row][col];
    return coords.every(([r,c])=>
        row+r < rows &&
        col+c < cols &&
        col+c >= 0 &&
        board[row+r][col+c].src === candy.src
    );
}

function crushTShape()
{
    for(let r = 0; r < rows-2; r++) {
        for(let c = 0; c < cols-2; c++) {

            let candy = board[r][c];
            if(candy.src.includes("blank")) continue;

            if(checkTShape(r,c, [[0,0],[0,1],[0,2],[1,1],[2,1]]))
            {

                clearTShape(r, c, [[0,0],[0,1],[0,2],[1,1],[2,1]]);
                score += 75;
            }
            else if(checkTShape(r,c, [[0,0],[1,0],[2,0],[1,1],[1,2]]))
            {

                clearTShape(r, c, [[0,0],[1,0],[2,0],[1,1],[1,2]]);
                score += 75;
            }
        }
    }
    for(let r = 2; r < rows; r++)
    {
        for(let c = 2; c < cols; c++)
        {
            let candy = board[r][c];
            if(candy.src.includes("blank")) continue;

            if(checkTShape(r,c, [[0,0],[0,-1],[0,-2],[-1,-1],[-2,-1]]))
            {
                clearTShape(r,c, [[0,0],[0,-1],[0,-2],[-1,-1],[-2,-1]]);
                score += 75;
            }
            else if(checkTShape(r,c, [[0,0],[-1,0],[-2,0],[-1,-1],[-1,-2]]))
            {
                clearTShape(r,c, [[0,0],[-1,0],[-2,0],[-1,-1],[-1,-2]]);
                score += 75;
            }
        }
    }
}

function clearTShape(r, c, coords)
{
    coords.forEach(([dr, dc]) => {
            board[r+dr][c+dc].src = "./images/blank.png";
    });
}

function checkTShape(r, c, coords) {
    let candy = board[r][c];
    return coords.every(([dr, dc]) => 
        r+dr>=0 && r+dr < rows &&
        c+dc>=0 && c+dc < cols && 
        board[r+dr][c+dc].src === candy.src
    );
}

function crushThree()
{
    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < cols-2; c++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src &&candy2.src == candy3.src && !candy1.src.includes("blank"))
            {
                candy1.src = "./images/blank.png"
                candy2.src = "./images/blank.png"
                candy3.src = "./images/blank.png"
                score += 30;
            }
        }
    }

    for(let c = 0; c < cols; c++)
    {
        for(let r = 0; r < rows - 2; r++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src &&candy2.src == candy3.src && !candy1.src.includes("blank"))
            {
                candy1.src = "./images/blank.png"
                candy2.src = "./images/blank.png"
                candy3.src = "./images/blank.png"
                score += 30;
            }
        }
    }
}

function checkValid()
{
    for(let r = 0; r < rows; r++)
    {
        for(let c = 0; c < cols-2; c++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src &&candy2.src == candy3.src && !candy1.src.includes("blank"))
            {
                return true;
            }
        }
    }

    for(let c = 0; c < cols; c++)
    {
        for(let r = 0; r < rows - 2; r++)
        {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src &&candy2.src == candy3.src && !candy1.src.includes("blank"))
            {
                return true;
            }
        }
    }
    return false;
}

function slideCandy()
{
    for(let c = 0; c < cols; c++)
    {
        let ind = rows-1;
        for(let r = rows-1; r >= 0; r--)
        {
            if(!board[r][c].src.includes("blank"))
            {
                board[ind][c].src = board[r][c].src;
                ind--; 
            }
        }

        for(let r = ind; r >= 0; r--)
        {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy()
{
    for(let c = 0; c < cols; c++)
    {
        if(board[0][c].src.includes("blank"))
        {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
function endGame() 
{
    alert("Game Over! Your score is: " + score);    
    isGameStarted = false;
    document.getElementById("game-container").style.display = "none";
    document.getElementById("landing-page").style.display = "block";
}