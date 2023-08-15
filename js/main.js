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



const player = new Player();

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        player.jump();
    }

});


const obstaclesArr = [];

setInterval(() => {
    //this.rand = Math.round(Math.random() * (5000 - 2000)) + 2000;
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 2000);

// move obstacles
setInterval(() => {

    obstaclesArr.forEach((obstacleInstance) => {
        obstacleInstance.moveLeft();

        // remove if outside
        if (obstacleInstance.positionX < 0 - obstacleInstance.width) {
            obstacleInstance.newObstacle.remove();
            obstaclesArr.shift();

        }

        //Detects Collision  
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {

            // Directs to gameover page
            console.log("GAME OVER");
            location.href = "./gameover.html"

        }
    });
}, 100);









