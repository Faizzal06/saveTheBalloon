class Background{
    constructor(game){
        this.game = game
        this.x = 0
        this.y = 0
        this.image = document.getElementById('background')
    }
    draw(ctx){
        ctx.drawImage(this.image,0, 0, this.game.width, this.game.height, this.x, this.y, this.game.width, this.game.height)
        ctx.drawImage(this.image,0, 0, this.game.width, this.game.height, this.x, this.y - this.game.height, this.game.width, this.game.height)
    }
    update(){
        this.y += this.game.speed
        if(this.y > this.game.height){
            this.y = 0
            console.log(this.game.height)
        }
    }
}