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
            
            const newObstacle = new Obstacle();
            this.obstaclesArr.push(newObstacle);
        }, 5000);

        // move obstacles
        setInterval(() => {
            //const result = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            this.obstaclesArr.forEach((obstacleInstance) => {                
                obstacleInstance.moveLeft();                
                this.removeObstacleIfOutside(obstacleInstance); //remove if outside                 
                this.detectCollision(obstacleInstance); //Detects Collision               
            });     
        }, 200);
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
        this.height = 20
        this.width = 5;
        this.positionX = 5;
        this.positionY = 10;
        this.newPlayer = null;
        this.isJumping = false;
        this.upTime;
        this.downTime;
        this.gravity = 0.09

        this.createDomElement();

    };

    createDomElement() {
        this.newPlayer = document.createElement("div");

        this.newPlayer.id = "player"
        this.newPlayer.style.width = this.width + "vw"
        this.newPlayer.style.height = this.height + "vh"
        this.newPlayer.style.left = this.positionX + "vw";
        this.newPlayer.style.bottom = this.positionY + "vh";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.newPlayer);

    };

    jump() {
        if (this.isJumping) return;

        this.upTime = setInterval(() => {
            if (this.positionY >= 100) {
                clearInterval(this.upTime);
                this.downTime = setInterval(() => {
                    if (this.positionY = + 10) {
                        clearInterval(this.downTime);
                        this.isJumping = false;
                    }
                    this.positionY = 10;
                    this.newPlayer.style.bottom = this.positionY + "vh";
                }, 100)
            }
            this.positionY += 10;
            this.newPlayer.style.bottom = this.positionY + "vh";
            this.isJumping = true;
        }, 20)

    };
};

class Obstacle {
    constructor() {
        this.height = 10
        this.width = 1;
        this.positionX = 100;
        this.positionY = 10;
        this.newObstacle = null
        
        this.createDomElement();

    };

    createDomElement() {
        this.newObstacle = document.createElement("div")

        this.newObstacle.className = "obstacle";
        this.newObstacle.style.width = this.width + "vw"
        this.newObstacle.style.height = this.height + "vh"
        this.newObstacle.style.left = this.positionX + "vw";
        this.newObstacle.style.bottom = this.positionY + "vh";

        const parentElement = document.getElementById("board");
        parentElement.appendChild(this.newObstacle);

    };

    moveLeft() {
        this.positionX -= 2;
        this.newObstacle.style.left = this.positionX + "vw"

    };

};

const game = new Game()
game.start();


















