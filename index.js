let grid = document.querySelector(".grid")
const buttontn = document.getElementById("start")
const scoreEl = document.getElementById("score") 
let squares = []
let currentSnake = [2,1,0]  
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 500
let time = 0

function createGrid()
{
    
    for(let i = 0 ;i <100;i++)

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

   if(
       (currentSnake[0] + width >= 100 && direction === 10)||
       (currentSnake[0] % 10 === 9 && direction === 1)||
       (currentSnake[0] % 10 === 0 && direction === -1)||
       (currentSnake[0] - 10 < 0  && direction === -10)||
       squares[currentSnake[0] + direction].classList.contains('snake')
     )
     return clearInterval(timerId)
   
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    let head = currentSnake.unshift(currentSnake[0] + direction)
    squares[head].classList.remove('snake')
    squares[currentSnake[0]].classList.add('snake')

    if(squares[currentSnake[0]].classList.contains('apple'))
    {
        squares[currentSnake[0]].classList.remove('apple')

        squares[tail].classList.add('apple')
         
        currentSnake.push(tail)

       score ++

       scoreEl.textContent = score
       intervalTime  = intervalTime * speed
    }
}

function startGame() {
   
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(time)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
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

document.addEventListener("keydown",control)



function random()
{
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    }while(squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}

random()

buttontn.addEventListener("click",startGame)















