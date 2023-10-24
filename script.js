input={x:0,y:0}
snake = [{x: 15, y: 15}];
food = {x: 6, y: 7};
let score = 0;


let lastpainttime = 0;
let speed = 10;


function engine(ctime){
    window.requestAnimationFrame(engine);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }else{
        lastpainttime=ctime;
        game();
    }
}


function game(){

    if(isCollide(snake)){
        
        input =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snake = [{x: 13, y: 15}];
        score =0;
        
    } 







    if(snake[0].y === food.y && snake[0].x ===food.x){
        score+=1;
        scoreBox.innerHTML = "Score: " + score;
        if(score>hiscore){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        snake.unshift({x: snake[0].x, y: snake[0].y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

        
        
        


    }

    

    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]};
    }



    
    snake[0].x+=input.x;
    snake[0].y+=input.y;






    board.innerHTML="";
    snake.forEach((e,index) => {
        a = document.createElement('div');
        a.style.gridRowStart = e.y;
        a.style.gridColumnStart = e.x;
        if (index===0){
            a.classList.add("head")
        }
        a.classList.add('snake');
        board.appendChild(a);

        
    });

    

    b = document.createElement('div');
    b.style.gridRowStart = food.y;
    b.style.gridColumnStart = food.x;
    b.classList.add('food');
    board.appendChild(b);
    
        
}


function isCollide(s){
    //if hits yourself
    for (let i = 1; i < snake.length; i++) {
        //i=0 true(0<1) (s[0].x === s[0].x && s[0].y === s[0].y) i++ 1
        //i=1 true(1<2) (s[1].x === s[0].x && s[1].y === s[0].y) i++ 2
        //i=2 true(2<3) (s[2].x === s[0].x && s[2].y === s[0].y) i++ 3
        if(s[i].x === s[0].x && s[i].y === s[0].y){
            return true;
        }
    }
    //if hits wall
    if(s[0].x >= 18 || s[0].x <=0 || s[0].y >= 18 || s[0].y <=0){
        return true;
    }
    return false;
}

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}






window.requestAnimationFrame(engine);
window.addEventListener("keydown",e=>{
    switch(e.key){
        case "ArrowUp":
            input.y=-1;
            input.x=0;

            break;
        case "ArrowDown":
            input.x=0;
            input.y=1;
            break;
        case "ArrowRight":
            input.x=1;
            input.y=0;
            break;
        case "ArrowLeft":
            input.x=-1;
            input.y=0;
            break;
        default:
            break;
    }

})


