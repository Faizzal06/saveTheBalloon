class Coin{
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 20 * this.game.ratio;
        this.baseRadius = 20;
        this.markedForDeletion = false;
        this.collided = false
        this.image = document.getElementById('coin')
    }

    draw(ctx){
        ctx.fillStyle = 'yellow'
        ctx.beginPath()
        if(this.game.debug){
            ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
        }
        ctx.drawImage(this.image,this.x, this.y, this.radius*2, this.radius*2)
        ctx.closePath()
    }
    
    update(){
        this.radius = this.baseRadius * this.game.ratio
        this.y += this.game.speed * this.game.ratio
        if (this.game.player.checkCollision(this)) {
            this.game.score++
            this.markedForDeletion = true
            this.game.coin = []
            console.log(this.game.coin.length)
        }
        if(this.y > this.game.height){
            this.markedForDeletion = true
            this.game.coin = []
            console.log(this.game.coin)
        }
    }

}
