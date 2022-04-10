



document.getElementById("twoPlayers").addEventListener("click", function(){
    for (i=0; i<grid.length; i++){
        grid[i].textContent = "";
    }
    if ((firstPlayer.getName() == "") & (secondPlayer.getName() == "")){
        firstPlayer.setName(window.prompt("What is your name?"))
        secondPlayer.setName(window.prompt("What is the name of your opponent?"))
    }
    if ((secondPlayer.getName() == "") || (secondPlayer.getName() == "Computer")){
        secondPlayer.setName(window.prompt("What is the name of your opponent?"))
    }

    gameBoard = Board(firstPlayer,secondPlayer,grid,2);

    
})

document.getElementById("vsAI").addEventListener("click", function(){
    for (i=0; i<grid.length; i++){
        grid[i].textContent = "";
        checkEmpty[i] = 0;
    }

    if ((firstPlayer.getName() == "")){
        firstPlayer.setName(window.prompt("What is your name?"))
    }

    secondPlayer.setName('Computer')

    gameBoard = Board(firstPlayer,secondPlayer,grid,1);
})

// The TicTacToe factory function
//turnFlag is a variable that contains the string spawned in each turn
const Board = (firstPlayer,secondPlayer,grid,mode) => {

    // used to draw the X's and O's inside the game grid
    const markerDraw = function(){
        /*if (turnFlag == "X"){
            turnFlag = "O"
            return firstPlayer.getMarker();
        }
        else{
            turnFlag = "X"
            return secondPlayer.getMarker();
        }*/

        if (firstPlayer.getTurn() == 1){
            firstPlayer.setTurn(0);
            secondPlayer.setTurn(1);
            return firstPlayer.getMarker();
        }
        else if (secondPlayer.getTurn() == 1){
            firstPlayer.setTurn(1);
            secondPlayer.setTurn(0);
            return secondPlayer.getMarker();
        }
    }

    const markerDrawAI = function(checkEmpty){
        let positions = new Array()
        for(i=0; i <= checkEmpty.length; i++){
            for(j=0; j <grid.length; j++){
                if ((grid[j].textContent == 'X') & (checkEmpty[j] == 0)){
                    positions[0] = j 
                    break;
                }
            }
            if (checkEmpty[i] == 0 ){
                console.log('J IS' +j)
                if (i != j){
                    checkEmpty[i] == 1
                    grid[i].textContent = secondPlayer.getMarker();
                    positions[1] = i
                    console.log(positions)
                    return positions
                }
                else{
                    continue;
                }
                
            } 
        }
    }

    const setCheckEmpty = function(positions,checkEmpty){
        checkEmpty[positions[0]] = 1;
        checkEmpty[positions[1]] = 1;
        return checkEmpty
    }

   

    

 

    const winCondition = function(){
        //8 win conditions
        let symbolCounter = 0; // counter that checks if all fields are full for tie
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
        for (i=0; i<grid.length; i++){
            if ((grid[i].textContent) != ""){
                symbolCounter++;
            }
        }
        if (symbolCounter == 9){
            symbolCounter = 0;
            return "Tie"
        }
    }

    const getMode = function(){
        return mode;
    }

    const gameEnd = function(){
        
        if (winCondition() == 'O'){
            alert(secondPlayer.getName() + ' Won!')  
            firstPlayer.setTurn(1);
            secondPlayer.setTurn(0);         
            return "end"
            
        }
        if (winCondition() == 'X'){
            alert(firstPlayer.getName() + ' Won!')
            firstPlayer.setTurn(1);
            secondPlayer.setTurn(0); 
            return "end"
        }  
        if (winCondition() == "Tie"){
            alert("None won!")
            firstPlayer.setTurn(1);
            secondPlayer.setTurn(0); 
            return "end"
        }
        return ""
    }

    

    
    return {markerDraw, markerDrawAI, gameEnd, getMode, setCheckEmpty}
    
}

// The TicTacToe player function
const Player = (name,marker,totalWins,turn) => {
    const getMarker = function(){
        return marker;
    }
    const getTotalWins = function() {
        return totalWins;
    };
    const setTurn = function(newTurn) {
        turn = newTurn;
    }
    const getTurn = function() {
        return turn;
    };
    const getName = function(){
        return name;
    }
    const setName = function(newName){
        name = newName
    }
    

    return {getMarker,getTotalWins,getTurn,setTurn,getName,setName}
};

let grid = {}
let checkEmpty = new Array() // array that checks whether a grid cell is empty or not
let startingMode = 0;
grid = document.getElementsByClassName("cell");
for (i=0; i< grid.length; i++){
   checkEmpty[i] = 0;
}
let firstName = ""
let secondName = ""
const firstPlayer = Player(firstName,'X',0,1);
const secondPlayer = Player(secondName,'O',0,0);
let gameBoard = Board(firstPlayer,secondPlayer,grid,startingMode);







// Adding event listener to every cell of the TicTacToe board

for (i=0; i<grid.length; i++){
    grid[i].addEventListener("click",function(){
        if ((this.textContent == "") & ((gameBoard.getMode() == 2))){
            if (gameBoard.gameEnd() == ""){ //calls the gameEnd function inside the board function
                this.textContent = gameBoard.markerDraw();
                gameBoard.gameEnd();
            }

        }
        else if (gameBoard.getMode() == 0){
            alert('Choose a mode first!')
        }

        if ((this.textContent == "") & ((gameBoard.getMode() == 1))){
            if (gameBoard.gameEnd() == ""){
                this.textContent = 'X';
                if (gameBoard.gameEnd() == ""){
                    console.log('i entered')
                    setTimeout(()=>{            //1 sec delay before the AI plays
                        checkEmpty = gameBoard.setCheckEmpty(gameBoard.markerDrawAI(checkEmpty), checkEmpty);
                        gameBoard.gameEnd();
                    },500)
                    
                    console.log('i left')
                }
                
            }
        }
    })
}



