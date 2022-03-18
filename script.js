



//clear button eventListener
document.getElementById("clear").addEventListener("click", function(){
    for (i=0; i<grid.length; i++){
        grid[i].textContent = "";
    }
})

document.getElementById("twoPlayers").addEventListener("click", function(){
    gameBoard = Board(firstPlayer,secondPlayer,"X",grid,2);
    
})

document.getElementById("vsAI").addEventListener("click", function(){
    gameBoard = Board(firstPlayer,secondPlayer,"X",grid,1);
})

// The TicTacToe factory function
//turnFlag is a variable that contains the string spawned in each turn
const Board = (firstPlayer,secondPlayer,turnFlag,grid,mode) => {
    const markerDraw = function(){
        if (turnFlag == "X"){
            turnFlag = "O"
            return firstPlayer.getMarker();
        }
        else{
            turnFlag = "X"
            return secondPlayer.getMarker();
        }
    }

    const winCondition = function(){
        //8 win conditions
        if (((grid[0].textContent == 'X') & (grid[1].textContent == 'X') & (grid[2].textContent == 'X')) || 
            ((grid[0].textContent == 'X') & (grid[3].textContent == 'X') & (grid[6].textContent == 'X')) || 
            ((grid[0].textContent == 'X') & (grid[4].textContent == 'X') & (grid[8].textContent == 'X')) || 
            ((grid[8].textContent == 'X') & (grid[5].textContent == 'X') & (grid[2].textContent == 'X')) || 
            ((grid[8].textContent == 'X') & (grid[7].textContent == 'X') & (grid[6].textContent == 'X')) || 
            ((grid[4].textContent == 'X') & (grid[2].textContent == 'X') & (grid[6].textContent == 'X')) || 
            ((grid[4].textContent == 'X') & (grid[1].textContent == 'X') & (grid[7].textContent == 'X')) || 
            ((grid[4].textContent == 'X') & (grid[3].textContent == 'X') & (grid[5] .textContent== 'X'))){
                return "X"
        }
        if (((grid[0].textContent == 'O') & (grid[1].textContent == 'O') & (grid[2].textContent == 'O')) || 
            ((grid[0].textContent == 'O') & (grid[3].textContent == 'O') & (grid[6].textContent == 'O')) || 
            ((grid[0].textContent == 'O') & (grid[4].textContent == 'O') & (grid[8].textContent == 'O')) || 
            ((grid[8].textContent == 'O') & (grid[5].textContent == 'O') & (grid[2].textContent == 'O')) || 
            ((grid[8].textContent == 'O') & (grid[7].textContent == 'O') & (grid[6].textContent == 'O')) || 
            ((grid[4].textContent == 'O') & (grid[2].textContent == 'O') & (grid[6].textContent == 'O')) || 
            ((grid[4].textContent == 'O') & (grid[1].textContent == 'O') & (grid[7].textContent == 'O')) || 
            ((grid[4].textContent == 'O') & (grid[3].textContent == 'O') & (grid[5].textContent == 'O'))){
                return "O"
        }
    }

    const getMode = function(){
        return mode;
    }

    const gameEnd = function(){
        if (winCondition() == 'O'){
            console.log('O wins');
            return "end"
            
        }
        if (winCondition() == 'X'){
            console.log('X wins');
            return "end"
        }
        return ""
    }
    
    return {markerDraw, gameEnd, getMode}
    
}

// The TicTacToe player function
const Player = (marker,totalWins,turn) => {
    const getMarker = function(){
        return marker;
    }
    const getTotalWins = function() {
        return totalWins;
    };
    const getTurn = function() {
        return turn;
    };

    return {getMarker,getTotalWins,getTurn}
};

let grid = {}
let startingMode = 0;
grid = document.getElementsByClassName("cell");
const firstPlayer = Player('X',0,1);
const secondPlayer = Player('O',0,0);
let gameBoard = Board(firstPlayer,secondPlayer,"X",grid,startingMode);







// Adding event listener to every cell of the TicTacToe board

for (i=0; i<grid.length; i++){
    grid[i].addEventListener("click",function(){
        if ((this.textContent == "") & ((gameBoard.getMode()== 1) || (gameBoard.getMode() == 2))){
            if (gameBoard.gameEnd() == ""){ //calls the gameEnd function inside the board function
                this.textContent = gameBoard.markerDraw();
            }
        }
        else{
            console.log('Choose a mode first!')
        }
    })
}



