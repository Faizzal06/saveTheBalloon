class Obstacle {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.baseWidth = 200
        this.width
        this.height
        this.image = document.getElementById('obstacle')
        this.right = false
        this.left = false
        this.markedForDeletion = false
        this.collided = false
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        if(this.game.debug){
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        ctx.drawImage(this.image, this.x, this.y - 10, this.width, this.height + 20)
    }

    update() {
        this.width = this.baseWidth * this.game.ratio
        this.height = 50 * this.game.ratio
        this.y += this.game.speed * this.game.ratio
        if (this.game.player.checkCollision(this)) {
            this.collided = true
            this.game.gameOver = true
        }
        if (this.y > this.game.height) {
            this.markedForDeletion = true
            this.game.obstacle = this.game.obstacle.filter(obs => !obs.markedForDeletion)
            this.game.addObstacle()
            console.log(this.game.obstacle.length)
        }
    }
}