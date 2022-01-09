let grid = document.querySelector(".grid")
const buttontn = document.getElementById("start")
const scoreEl = document.getElementById("score") 
const moveSound = new Audio('move.mp3');
const gameOverSound = new Audio('music_gameover.mp3');
let squares = []
let currentSnake = [2,1,0]  
let direction = 1
let width = 20
let appleIndex = 0
let score = 0
let intervalTime = 300
let time = 0

function createGrid()
{
    
    for(let i = 0;i <width*width;i++)

    {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
    }

}
createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))
function move() {

    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
     return clearInterval(time) 
  
   
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')

    if(squares[currentSnake[0]].classList.contains('apple'))
    {
        squares[currentSnake[0]].classList.remove('apple')
        moveSound.play();

        random()

        currentSnake.push(tail)

       score ++

       scoreEl.textContent = score
       intervalTime  = intervalTime 
    }
}

function startGame() {
   
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
  
    clearInterval(time)
    currentSnake = [2,1,0]
    score = 0
    scoreEl.textContent = score
    direction = 1
    random()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    time = setInterval(move, intervalTime)
}
function control(e)
{
    if(e.keyCode === 39)
    {
        direction = 1 
    }else if (e.keyCode === 38) {
        
        direction = -width 
    } else if (e.keyCode === 37) {

        direction = -1
    } else if (e.keyCode === 40) {
       
        direction = +width
        
    }
}




function random()
{
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    }while(squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}

random()

buttontn.addEventListener("click",startGame)
document.addEventListener("keydown",control)















