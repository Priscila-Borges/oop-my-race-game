class Game {
    constructor() {
        this.player = new Player();
        this.obstaclesArr = []; // store instances of the class Obstacle
        this.points = 0; //will be implemented later
    }

    start() {
        // attach event listeners
        this.attachEventListeners();

        // create obstacles
        setInterval(() => {
            //const result = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 2000);
    
        // move obstacles
        setInterval(() => {           
            this.obstaclesArr.forEach((obstacleInstance) => {                
                obstacleInstance.moveLeft();                
                this.removeObstacleIfOutside(obstacleInstance); //remove if outside                 
                this.detectCollision(obstacleInstance); //Detects Collision               
            });     
        }, 15);
    }

    attachEventListeners() {

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                this.player.jump();
            }
        });
    }

    removeObstacleIfOutside(obstacleInstance){
        
        if (obstacleInstance.positionX < 0 - obstacleInstance.width) {
            obstacleInstance.newObstacle.remove();
            this.obstaclesArr.shift();
            this.points++
        }
    }

    detectCollision(obstacleInstance){
        
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.positionY + this.player.height > obstacleInstance.positionY
        ) {

            // Directs to gameover page
           location.href = "./gameover.html"

        }
    }
}

class Player {
    constructor() {
        this.height = 200
        this.width = 150;
        this.positionX = 5; 
        this.positionY = 90;
        this.newPlayer = null;
        this.isJumping = false;
        this.upTime;
        this.downTime;
        this.gravity = 0.9

        this.createDomElement();

    };

    createDomElement() {
        this.newPlayer = document.createElement("div");

        this.newPlayer.id = "player"
        this.newPlayer.style.width = this.width + "px"
        this.newPlayer.style.height = this.height + "px"
        this.newPlayer.style.left = this.positionX + "px";
        this.newPlayer.style.bottom = this.positionY + "px";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.newPlayer);

    };

    jump() {
        if (this.isJumping) return;

        this.upTime = setInterval(() => {
            if (this.positionY >= 230) {
                clearInterval(this.upTime);
                this.downTime = setInterval(() => {
                    if (this.positionY < 90) {
                        clearInterval(this.downTime);
                        this.isJumping = false;
                    }
                    this.positionY -= 20;
                    this.newPlayer.style.bottom = this.positionY + "px";
                }, 130)
            }
            this.positionY += 30;
            this.positionY = this.positionY * this.gravity;
            this.newPlayer.style.bottom = this.positionY + "px";
            this.isJumping = true;
        }, 20)

    };
};

class Obstacle {
    constructor() {
        this.height = 90 
        this.width = 10;
        this.positionX = 1000;
        this.positionY = 80;
        this.newObstacle = null
        
        this.createDomElement();

    };

    createDomElement() {
        this.newObstacle = document.createElement("div")

        this.newObstacle.className = "obstacle";
        this.newObstacle.style.width = this.width + "px"
        this.newObstacle.style.height = this.height + "px"
        this.newObstacle.style.left = this.positionX + "px";
        this.newObstacle.style.bottom = this.positionY + "px";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.newObstacle);

    };    

    moveLeft() {
        this.positionX -= 7;
        this.newObstacle.style.left = this.positionX + "px"

    };

};

const game = new Game()
game.start();


















