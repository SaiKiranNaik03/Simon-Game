let gameSq=[];
let userSq=[];

let btnColor = ['red' , 'green' , 'yellow' , 'blue'];
let start = false;
let score=0;
let highScore=0;

let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let green = document.querySelector("#green");
let blue = document.querySelector("#blue");

let allBtn = document.querySelectorAll('.btn');
let h3 = document.querySelector('h3');

function checkGame(){
    if(start == false){
        alert("Press any key to start!")
    }
}
red.onclick=checkGame;
blue.onclick=checkGame;
yellow.onclick=checkGame;
green.onclick=checkGame;

document.addEventListener("keypress",function(){
    if(start == false){
        console.log("game started!");
        start = true;
        setTimeout(levelUp,500);
    }
})


function blinkBtn(Btn){
    Btn.classList.add('flash');
    setTimeout(function(){
        Btn.classList.remove('flash');
    },200);
}
function userBlink(Btn){
    Btn.classList.add('userPress');
    setTimeout(function(){
        Btn.classList.remove('userPress');
    },200);
}

function levelUp(){
    userSq=[];
    score++;
    h3.innerHTML=`Score: ${score}`;
    
    let rndInx = Math.floor(Math.random()*3);
    let rndbtn = btnColor[rndInx];
    let Btn = document.querySelector(`.${rndbtn}`);
    gameSq.push(rndbtn);
    blinkBtn(Btn);
}
function checkSq(idx){
    if(gameSq[idx] === userSq[idx]){
        if(userSq.length == gameSq.length){
            setTimeout(levelUp,500);
        }
    }else{
        if(start == true){
            for(btn of allBtn){
                btn.classList.add('gameOver');
            }
            setTimeout(function(){
                for(btn of allBtn){
                btn.classList.remove('gameOver');
                }
            },150);
        }
        if(score > highScore){
            highScore=score;
        }
        if(start == true){
            h3.innerHTML=`Game Over! <b>Score:${score}</b><br>High Score:${highScore}<br>Press any key to start again.`;
        }
        start = false;
        if(document.addEventListener("keydown",restart));
    }
}
function btnPress(){
    let btn = this;
    if(start == true)userBlink(btn);

    let color = btn.getAttribute('id');
    userSq.push(color);
    checkSq(userSq.length-1);
}

for(btn of allBtn){
    btn.addEventListener("click",btnPress);
}

function restart(){
    
    start=false;
    gameSq=[];
    userSq=[];
    score=0;
}