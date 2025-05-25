class Player{
    constructor(game){
        this.game = game
        this.x = 100
        this.y = this.game.height - 100
        this.targetX = this.x
        this.targetY = this.y
        this.radius = 30 * this.game.ratio
        this.right = false
        this.left = false
        this.image = document.getElementById('player')
    }
    
    draw(ctx){
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        if(this.game.debug){
            ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.drawImage(this.image, this.x, this.y, this.radius*2, this.radius*2.5)
        ctx.closePath()
    }
    
    update(){
        this.radius = 30 * this.game.ratio
        if (this.right) {
            this.targetX += 5
        }
        if (this.left) {
            this.targetX -= 5
        }
        // Smoothly interpolate x and y towards targetX and targetY
        const smoothing = 0.5
        this.x += (this.targetX - this.x) * smoothing
        this.y += (this.targetY - this.y) * smoothing

        if(this.x < 0){
            this.x = 0
            this.targetX = 0
        }
        if(this.x > this.game.width - this.radius * 2){
            this.x = this.game.width - this.radius * 2
            this.targetX = this.game.width - this.radius * 2
        }
        if(this.y < 0){
            this.y = 0
            this.targetY = 0
        }
        if(this.y > this.game.height - this.radius * 2){
            this.y = this.game.height - this.radius * 2
            this.targetY = this.game.height - this.radius * 2
        }
    }

    checkCollision(obj) {
        if (obj.width && obj.height) {
            // Circle-rectangle collision
            const distX = Math.abs((this.x + this.radius) - (obj.x + obj.width / 2))
            const distY = Math.abs((this.y + this.radius) - (obj.y + obj.height / 2))

            if (distX > (obj.width / 2 + this.radius)) { return false }
            if (distY > (obj.height / 2 + this.radius)) { return false }

            if (distX <= (obj.width / 2)) { return true }
            if (distY <= (obj.height / 2)) { return true }

            const dx = distX - obj.width / 2
            const dy = distY - obj.height / 2
            return (dx * dx + dy * dy <= (this.radius * this.radius))
        } else if (obj.radius) {
            // Circle-circle collision
            const dx = (this.x + this.radius) - (obj.x + obj.radius)
            const dy = (this.y + this.radius) - (obj.y + obj.radius)
            const distance = Math.sqrt(dx * dx + dy * dy)
            return distance < this.radius + obj.radius
        }
        return false
    }
}
