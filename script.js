// https://www.youtube.com/watch?v=QxYg8-mhhhs&t=1771s&ab_channel=Frankslaboratory
// https://www.youtube.com/watch?v=mpvNwYmTMJ4&t=0s&ab_channel=Frankslaboratory
// https://www.youtube.com/watch?v=iRgpZ4UohlU&ab_channel=DevNinja    resolving bug for load js and css

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1800;
canvas.height = 600;

//globall variables-------------------------------------------------
const cellSize = 100;
const cellGap = 3;

let numberOfResources = 600;
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
let score = 0;

let chosenDefender = 1; 

const winningScore = 50;

const gameGrid = [];
const defenders = [];
const projectiles = [];
const enemies = [];
const enemyPositions = [];
const resources = [];


// mouse---------------------------------------------------------
const mouse ={
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
    clicked: false
}

canvas.addEventListener('mousedown', function(){
 mouse.clicked = true;
});
canvas.addEventListener('mouseup', function(){
    mouse.clicked = false;
});


let canvasPosition = canvas.getBoundingClientRect();
// console.log(canvasPosition);

        canvas.addEventListener('mousemove', function(e){
            mouse.x = e.x - canvasPosition.left;
            mouse.y = e.y - canvasPosition.top;
        });

        canvas.addEventListener('mouseleave', function(){
        mouse.x = undefined;
        mouse.y = undefined; 
        });

// game bord ------------------------------------------------------------------
    const controlsBar = {
    width: canvas.width,
    height: cellSize,
    }

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    //    draw squares------------------------------------------------------
            draw(){
                if(mouse.x && mouse.y && collision(this, mouse)){
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(this.x, this.y, this.width, this.height);

                }
                
            }
}

function createGrid(){
    for (let y = cellSize; y < canvas.height; y+= cellSize){
        for(let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();

        function handleGameGrid(){
            for(let i = 0; i < gameGrid.length; i++){
                gameGrid[i].draw();
            }
        }



 // projectiles------------------------------------------------------------
//  const projectiles = new Image();
//  projectiles.src = './defenders/defender2.png'
class Projectille {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
        // this.frameX = 0;
        // this.frameY = 0;
        // this.spriteWidth = 256;
        // this.spriteHeight = 256;
        // this.minFrame = 0;
        // this.maxFrame = 7;
        
    }
    update(){
        this.x += this.speed;
    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();

    }
}
function handleProjectiles(){
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].update();
        projectiles[i].draw();
      
        for(let j = 0; j< enemies.length; j++){
            if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j]))
             {
                enemies[j].health -=  projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
             }
        }


        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}

// defenders  ----------------------------------------------------------------------
const defender1 = new Image();
defender1.src = './defenders/defender 1.png'
const defender2 = new Image();
defender2.src = './defenders/defender 2.png'
const defender3 = new Image();
defender3.src = './defenders/wh.png'

class Defender {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.shootNow = false;
        this.health = 100;
        this.health2 = 100;
        this.health3 = 100;
        this.projectiles = [];
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.chosenDefender = chosenDefender;

    }
    draw(){
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        
        if (this.chosenDefender === 1){ // draw 1st defendedr
            ctx.fillText(Math.floor(this.health), this.x, this.y ); //health position for defender
                ctx.drawImage(defender1, this.frameX * this.spriteWidth, 0, this.spriteWidth,
                    this.spriteHeight, this.x, this.y, this.width, this.height);
                    } else if(this.chosenDefender === 2){ // draw 2nd defender
                        ctx.fillText(Math.floor(this.health2), this.x , this.y ); //health position for defender
                        ctx.drawImage(defender2, this.frameX * this.spriteWidth, 0, this.spriteWidth,
                            this.spriteHeight, this.x, this.y, this.width, this.height);
                            }  else if(this.chosenDefender === 3){ // draw 2nd defender
                                ctx.fillText(Math.floor(this.health3), this.x , this.y ); //health position for defender
                                ctx.drawImage(defender3, this.frameX * this.spriteWidth, 0, this.spriteWidth,
                                    this.spriteHeight, this.x, this.y, this.width, this.height);
                        }
       
    }
            update(){
                if(frame % 8 === 0){ //speed for spawn projectiles
                    if(this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = this.minFrame;
                if (this.frameX === 3) this.shootNow = true; //numarul pozei (frame) la care incepe sa traga defenderusl

                }
                
                if(this.chosenDefender === 1){
                    if(this.shooting){ //shoting
                        this.minFrame = 3;
                        this.maxFrame = 8;
                    } else
                    { //idle
                        this.minFrame = 8;
                        this.maxFrame = 8;
                    }
              } else if(this.chosenDefender === 2){
                if(this.shooting){ //shoting
                    this.minFrame =3;
                    this.maxFrame = 9;
                } else
                { //idle
                    this.minFrame = 10;
                    this.maxFrame = 10;
                }
              } else if(this.chosenDefender === 3){
                if(this.shooting){ //shoting
                    this.shootNow = false;
                    this.minFrame =0;
                    this.maxFrame = 0;
                } else
                { //idle
                    this.shootNow = false;
                    this.minFrame = 0;
                    this.maxFrame = 0;
                }
              }



                if(this.shooting && this.shootNow){
                    projectiles.push(new Projectille(this.x + 70, this.y + 38)); //ultima cifra locul de spawn la proiectil    
                    this.shootNow = false;     
            }
    }
}


function handleDefenders(){
    for(let i = 0; i < defenders.length; i++){
        defenders[i].draw();
         defenders[i].update();
          if(enemyPositions.indexOf(defenders[i].y) !== -1)
          {
            defenders[i].shooting = true;
          }else
          {
            defenders[i].shooting = false;

          }

            for(let j = 0; j < enemies.length; j++){
                if(defenders[i] && collision(defenders[i], enemies[j])){
                    enemies[j].movement = 0;
                    defenders[i].health -= 0.5;
                }  //colision eror from here to
                    if(defenders[i] && defenders[i].health <= 0){
                        defenders.splice(i, 1);
                        i--;
                        enemies[j].movement = enemies[j].speed;
                    }
                    // to here


                    if(defenders[i] && collision(defenders[i], enemies[j])){
                        enemies[j].movement = 0;
                        defenders[i].health2 -= 0.5;
                    }  //colision eror from here to
                        if(defenders[i] && defenders[i].health2 <= 0){
                            defenders.splice(i, 1);
                            i--;
                            enemies[j].movement = enemies[j].speed;
                        }



                                if(defenders[i] && collision(defenders[i], enemies[j] )){
                                    enemies[j].movement = 0;
                                    defenders[i].health3 -= 0.5;
                                }  //colision eror from here to
                                    if(defenders[i] && defenders[i].health3 <= 0){
                                        defenders.splice(i, 1);
                                        i--;
                                        enemies[j].movement = enemies[j].speed;
                                    }

            }
    }

}

// choose between defenders

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}

const card2 = {
    x: 105,
    y: 10,
    width: 70,
    height: 85
}

const card3 = {
    x: 200,
    y: 10,
    width: 80,
    height: 85
}

function chooseDefender(){
    let card1stroke = 'black'; //border active
    let card2stroke = 'black'; //border not active
    let card3stroke = 'black';

    if (collision(mouse, card1) && mouse.clicked){
        chosenDefender = 1;
    } else if(collision(mouse, card2) && mouse.clicked){
        chosenDefender = 2;
    } else if(collision(mouse, card3) && mouse.clicked){
        chosenDefender = 3;
    }


    
    if (chosenDefender === 1){
        card1stroke = 'gold';
        card2stroke = 'black';
        card3stroke = 'black';
        // floatingMessages.push(new floatingMessage('100', 100, 50, 30, 'gold'));

    } else if(chosenDefender === 2) {
        card1stroke = 'black';
        card2stroke = 'gold';
        card3stroke = 'black';

    } else if(chosenDefender === 3){
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'gold';

    } else {
        card1stroke = 'black';
        card2stroke = 'black';
        card3stroke = 'black';

    }


 
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    //defender 1
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);   
    ctx.strokeStyle = card1stroke; //create border
    ctx.strokeRect(card1.x, card1.y, card1.width, card1.height); 
    ctx.drawImage(defender1, 0, 0, 256, 256, 0, 5, 256/3, 256/3); 

//defender2
    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    ctx.drawImage(defender2, 0, 0, 256, 256, 100, 5, 256/3, 256/3); 
    //                             dim.frame  x    y (canvass)
    ctx.strokeStyle = card2stroke; // create border
    ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);

//defender3
    ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
    ctx.drawImage(defender3, 0, 0, 256, 256, 200, 5, 256/3, 256/3); 
    //                             dim.frame  x    y (canvass)
    ctx.strokeStyle = card3stroke; // create border
    ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
}
// -----------------------------------------------------------------------------
// floating Messages 

const floatingMessages = [];
class floatingMessage {
    constructor(value, x, y, size, color){
        this.value = value;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;

    }
    update(){
        this.y -= 0.3;
        this.lifeSpan += 1;
        if(this. opacity > 0.03) this.opacity -= 0.05;

    }
    draw(){
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        this.font = this.size + 'px Orbitron';
        ctx.fillText(this.value, this.x, this.y);
        ctx.globalAlpha = 1;

    }
}

function handleFloatingMessages(){
    for(let i = 0; i < floatingMessages.length; i++){
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if(floatingMessages[i].lifeSpan >= 50){
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}


// ----------------------------------------------------------------------------------------
// enemies

const enemyTypes = [];
// enemy1
const enemy1 = new Image();
enemy1.src = './enemies/enemy1.png';
enemyTypes.push(enemy1);

class Enemy{
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;

        this.enemyType = enemyTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;
        this.spriteWidth = 687;
        this.spriteHeight = 632;
    }
    
    update() {
        this.x -= this.movement;
        if(frame % 10 === 0){
        if(this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
        }
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        
        // write enemy1 life in square -----------------
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y ); // position for lifefor enemy
        // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, 
                      this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height );
    }
}

function handleEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
          if(enemies[i].x < 0)
          {
           gameOver = true;

          }
          if(enemies[i].health <= 0){
            let gainedResources = enemies[i].maxHealth / 10;
            floatingMessages.push(new floatingMessage('+' + gainedResources,enemies[i].x, enemies[i].y, 30, 'black'));
            floatingMessages.push(new floatingMessage('+' + gainedResources, 800, 50, 30, 'gold'));
            numberOfResources += gainedResources;
            score += gainedResources;
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
          }
     }     //spawn interval
            if (frame % enemiesInterval === 0 && score < winningScore){
                let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
                enemies.push(new Enemy(verticalPosition));
                enemyPositions.push(verticalPosition);
                if(enemiesInterval > 120) enemiesInterval -= 50;
            }
}
// enemy 2s
// enemy 2
const enemy2 = new Image();
enemy2.src = './enemies/enemy2.png';
enemyTypes.push(enemy2);

class EnemyAlien{
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 150;
        this.maxHealth = this.health;

        this.enemyType = enemyTypes[1];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 16;
        this.spriteWidth = 352;
        this.spriteHeight = 533;
    }
    
    update() {
        this.x -= this.movement;
        if(frame % 10 === 0){
        if(this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
        }
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
         ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        // write life in everi enemy2 square---------------
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y ); // positiionnfor life for enemy
        // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.enemyType, this.frameX * this.spriteWidth, 0, 
                      this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height );
    }
}

function handleEnemiesAlien(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
          if(enemies[i].x < 0)
          {
           gameOver = true;

          }
          if(enemies[i].health <= 0){
            let gainedResources = enemies[i].maxHealth / 5;
            floatingMessages.push(new floatingMessage('+' + gainedResources,enemies[i].x, enemies[i].y, 30, 'black'));
            floatingMessages.push(new floatingMessage('+' + gainedResources, 800, 50, 30, 'gold'));
            numberOfResources += gainedResources;
            score += gainedResources ;
            const findThisIndex = enemyPositions.indexOf(enemies[i].y);
            enemyPositions.splice(findThisIndex, 1);
            enemies.splice(i, 1);
            i--;
          }
     }       //spawn inerval
            if (frame % enemiesInterval === 60 && score < winningScore){
                let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
                enemies.push(new EnemyAlien(verticalPosition));
                enemyPositions.push(verticalPosition);
                if(enemiesInterval > 600) enemiesInterval -= 25;
            }
}
// enemy 3-----------


// resources-------------------------------------------------------------------------


const amounts = [20, 40, 60, 30, 80];
class Resources {
    constructor(){
        this.x = Math.random() * (canvas.width - cellSize)
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.health = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.health);
        ctx.fillStyle = 'black';
        ctx.font = '20px Orbitron';
        ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
    
}

function handleResources(){
    if(frame % 500 === 0 && score < winningScore)
    {
        resources.push(new Resources());
    }
    for(let i = 0; i < resources.length; i++){
        resources[i].draw();
        if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
            numberOfResources += resources[i].amount;
            floatingMessages.push(new floatingMessage('+' + resources[i].amount, resources[i].x, resources[i].y, 30, 'black'));
            floatingMessages.push(new floatingMessage('+' + resources[i].amount, 800, 60, 20, 'gold'));
            
            resources.splice(i, 1);
            i--;
        }
    }
}





// utilities --------------------------------------------------------------------------
function handleGamesStatus(){
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Score: ' + score, 580, 40);
    ctx.fillText('Resources: ' + numberOfResources, 580, 80);
    if(gameOver){
        ctx.fillStyle = 'black';
         ctx.font = '90px Orbitron';
         ctx.fillText('GAME OVER', 435, 330);
    }

    if(score >= winningScore && enemies.length === 0){
        ctx.fillStyle = 'black';
        ctx.font = '60px Orbitron';
        ctx.fillText('LEVEL COMPLETE', 630, 300);
        ctx.font = 'px Orbitron';
        ctx.fillText('You win with ' + score + ' points', 630, 340)

    }
}

// not enought resources
canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
      if(gridPositionY < cellSize) return;
       for(let i = 0; i < defenders.length; i++){
        if(defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) 
          return;
       }
  
    //    cost of deploy defenders
        let defenderCost = 100;
        let defenderCost2 = 150;
        let defenderCost3 = 200;
            if(numberOfResources >= defenderCost && chosenDefender === 1){
                defenders.push(new Defender(gridPositionX, gridPositionY));
                numberOfResources -=defenderCost

                } else if(numberOfResources >= defenderCost2 && chosenDefender === 2){
                    defenders.push(new Defender(gridPositionX, gridPositionY));
                    numberOfResources -=defenderCost2

                } else if(numberOfResources >= defenderCost3 && chosenDefender === 3){
                    defenders.push(new Defender(gridPositionX, gridPositionY));
                    numberOfResources -=defenderCost3

                }
                    else{
                        floatingMessages.push(new floatingMessage('need more resources', mouse.x, mouse.y, 15, 'red'));
                    }

});

// ---------------------------------------------------------------------------------
// animatii
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    
    ctx.fillRect(0,0,controlsBar.width-3000, controlsBar.height);
    
    
    handleGameGrid();
    handleDefenders();
    handleResources();
    handleProjectiles();
    handleEnemies();
    handleEnemiesAlien();
    chooseDefender();

    handleGamesStatus();
    handleFloatingMessages();
    
    // ctx.fillText('Resources: ' + numberOfResources, 20, 55);
    frame++;
    // console.log(frame);
    if (!gameOver) requestAnimationFrame(animate);
}

animate();



// colision --------------------------------------------------------------------------

function collision(first, second){
    if( !( first.x > second.x + second.width || 
           first.x + first.width < second.x ||
           first.y > second.y + second.height ||
           first.y + first.height < second.y)  
      ){
        return true;
      };
};
// resize 
window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})


//  Auto resize canvas

// let cnv

// window.onload = function(){
//     console.log('loading.');
//     cnv = document.getElementById("canvas1");
//     prepareDocument()
//     resizeCanvas();
//     drawRect()
// }

// window.onresize = function(){
//     resizeCanvas();
// }
// function resizeCanvas(){
//     cnv.width = window.innerWidth;
//     cnv.height = window.innerHeight;
// }
// function prepareDocument(){
//     document.body.style.padding = "2px";
//     document.body.style.margin = "2px";
// }
// function drawRect(){
//     let ctx = cnv.getContext("2d");
//     let width = cnv.width * 0.2;
//     let height = cnv.height * 0.2;
//     let  xpos = cnv.width/2 - width/2;
//     let ypos = cnv.height/2 - height/2;
//     ctx.fillRect(xpos,ypos,width,height);
// }