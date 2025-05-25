class Game {
    constructor(canvas, context) {
        this.canvas = canvas
        this.ctx = context
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.baseWidth = 450
        this.ratio = this.width / this.baseWidth
        this.resize(window.innerWidth, window.innerHeight)
        this.backround = new Background(this)
        this.player = new Player(this)
        this.obstacle = [new Obstacle(this, 150, 250), new Obstacle(this, 300, 50), new Obstacle(this, 200, -150),new Obstacle(this, 100, -350)]
        this.coin = []
        this.score = 0
        this.speed = 1
        this.maxSpeed = 5

        this.gameOver = false;
        this.debug = false

        this.minObstacleInterval = 1000
        this.speedIncreaseRate = 0.001
        this.obstacleIntervalDecreaseRate = 1

        this.touchStartX
        this.touchStartY
        this.changedTouchesX
        this.changedTouchesY

        this.obstacleTimer = 1
        this.obstacleInterval = 4500
        this.coinTimer = 1
        this.coinInterval = 10000

        document.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.target.innerHeight)
        })

        document.addEventListener('keydown', e => {
            if (e.key === 'd') {
                this.debug = !this.debug
            }
        })

        document.addEventListener('touchstart', e => {
            this.touchStartX = e.changedTouches[0].pageX
            this.touchStartY = e.changedTouches[0].pageY
            if (this.gameOver) {
                location.reload()
            }
        })

        document.addEventListener('touchmove', e => {
            const sensitivity = 0.7
            const currentX = e.changedTouches[0].pageX
            const currentY = e.changedTouches[0].pageY
            const deltaX = currentX - this.touchStartX
            const deltaY = currentY - this.touchStartY
            this.player.targetX += deltaX * sensitivity
            this.player.targetY += deltaY * sensitivity
            this.touchStartX = currentX
            this.touchStartY = currentY
        })
    }

    resize(width, height) {
        this.canvas.width = width
        this.canvas.height = height
        this.width = width
        this.ratio = this.width / this.baseWidth
        console.log(this.ratio)
    }

    addObstacle() {
        const x = Math.random() * (this.width - 200 * this.ratio)
        const y = this.obstacle[this.obstacle.length - 1].y - 200
        this.obstacle.push(new Obstacle(this, x, y))
    }

    spawnCoin() {
        console.log('coin spawned')
        const x = Math.random() * (this.width - 200 * this.ratio)
        const y = 0
        this.coin.push(new Coin(this, x, y))
    }

    speedControl(deltaTime) {
        this.obstacleTimer += deltaTime
        this.coinTimer += deltaTime

        // Increase speed gradually up to maxSpeed
        if (this.speed < this.maxSpeed) {
            this.speed += this.speedIncreaseRate * deltaTime
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed
            }
        }

        if (this.coinTimer > this.coinInterval) {
            this.spawnCoin()
            this.coinTimer = 0
        }
    }

    drawStatusText() {
        this.ctx.save()
        this.ctx.font = '24px Bungee'
        this.ctx.fillStyle = 'black'
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'top'
        this.ctx.fillText(`coin : ${this.score}`, 10, 10)
        if (this.gameOver) {
            this.speed = 0
            this.ctx.font = '50px Bungee'
            this.ctx.textAlign = 'center'
            this.ctx.fillText('gameOver', this.width * 0.5, this.height * 0.5)
            this.ctx.font = '24px Bungee'
            this.ctx.fillText('Click anywhere to reload', this.width * 0.5, this.height * 0.5 + 50)
        }
    }

    render(deltaTime) {
        this.backround.draw(this.ctx)
        this.backround.update()
        
        for (let i = 0; i < this.obstacle.length; i++) {
            this.obstacle[i].draw(this.ctx)
            this.obstacle[i].update()
        }
        for (let i = 0; i < this.coin.length; i++) {
            this.coin[i].draw(this.ctx)
            this.coin[i].update()
        }

        this.player.update()
        this.player.draw(this.ctx)
        this.speedControl(deltaTime)
        this.drawStatusText()
    }
}

window.addEventListener('load', function () {

    const canvas = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 450
    canvas.height = window.innerHeight

    const game = new Game(canvas, ctx)

    let lastTime = 0
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render(deltaTime)
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
})