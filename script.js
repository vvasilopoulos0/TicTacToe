let grid = {}



//clear button eventListener
document.getElementById("clear").addEventListener("click", function(){
    for (i=0; i<grid.length; i++){
        grid[i].textContent = "";
    }
})

// The TicTacToe factory function
//turnFlag is a variable that contains the string spawned in each turn
const Board = (firstPlayer,secondPlayer,turnFlag,grid) => {
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
                console.log('monkas')
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
    return {markerDraw , winCondition}
    
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


grid = document.getElementsByClassName("cell");
const firstPlayer = Player('X',0,1);
const secondPlayer = Player('O',0,0);


const gameBoard = Board(firstPlayer,secondPlayer,"X",grid);
console.log(gameBoard.markerDraw());
console.log(typeof(firstPlayer.getMarker()))

// Adding event listener to every cell of the TicTacToe board

console.log(grid)
console.log(gameBoard)
for (i=0; i<grid.length; i++){
    grid[i].addEventListener("click",function(){
        if (this.textContent == ""){
            this.textContent = gameBoard.markerDraw();
        }
        console.log(gameBoard.winCondition())
        if (gameBoard.winCondition() == "X"){
            console.log('X wins')
        }
        else if(gameBoard.winCondition() == "O"){
            console.log('O wins')
        }
    })
}



