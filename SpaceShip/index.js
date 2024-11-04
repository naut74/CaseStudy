const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scoreEl = document.getElementById("scoreEl");
const startGameBtn = document.getElementById("StartGameBtn");
const modelEl = document.getElementById("modelEl");
const bigScoreEl = document.getElementById("bigScoreEl");

// document.querySelector("#startGameBtn").click();

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const friction = 0.97;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}


const x = canvas.width / 2;
const y = canvas.height / 2;
// player.draw();

let player = new Player(x, y, 20, 'white');
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
    player = new Player(x, y, 20, 'white');
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEl.innerHTML = score;
    bigScoreEl.innerHTML = score;
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random()*(30 - 10) + 10;
        let x;
        let y;

        if (Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5? 0 - radius : canvas.height + radius;
        }

        const color = 'hsl(' + Math.random() * 360 + ', 50%, 50%)';
        
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle), // Tốc độ di chuyển theo trục X
            y: Math.sin(angle)  // Tốc độ di chuyển theo trục Y
        };
        
        enemies.push(new Enemy(x,y, radius, color, velocity)); },1000)
}

let animationId;
let score = 0;
function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle,index) => {
        if(particle.alpha <= 0) {
            particles.splice(index,1);
        } else {
            particle.update();
        }
    });
    projectiles.forEach((projectile) => {
        projectile.update();

        // Remove from edge of screen
        if(projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 || 
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(projectiles.indexOf(projectile), 1)
            }, 0);
        }
    });
  
    enemies.forEach((enemy, index) => {
        enemy.update();
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y) 
  
        // end game
        if(dist - (player.radius + enemy.radius) < 1) {
            cancelAnimationFrame(animationId);
            modelEl.style.display = 'flex';
            bigScoreEl.innerHTML = score;
        }    
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y) 
            
            // when projectile hit enemy
            if(dist - (projectile.radius + enemy.radius) < 1) {
                
                // remove enemy
                // enemies.splice(index, 1);
                
                // remove projectile
                projectiles.splice(projectileIndex, 1);
                
                // create explosion particles
                for(let i = 0; i < enemy.radius*2; i++) {
                    particles.push(
                        new Particle(enemy.x, enemy.y, Math.random() * 2, enemy.color, 
                        {
                            x: (Math.random() - 0.5)*(Math.random()*6) ,
                            y: (Math.random() - 0.5) *(Math.random()*6)
                        })
                    )
                }

                // create explosion particles
                for(let i = 0; i < enemy.radius*2; i++) {
                    particles.push(
                        new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, 
                        {
                            x: (Math.random() - 0.5)*(Math.random()*6) ,
                            y: (Math.random() - 0.5) *(Math.random()*6)
                        })
                    )
                }

                if(enemy.radius - 10 > 5) {
                     //increase score
                    score+=100;
                    scoreEl.innerText = score;
                    gsap.to(enemy, { radius: enemy.radius - 10});
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                } else {
                    //increase score
                    score+=250;
                    scoreEl.innerText = score;
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            }
        });
            
    });
}

addEventListener('click', (event) => {
    console.log(projectiles);
    
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle)*5, // Tốc độ di chuyển theo trục X
        y: Math.sin(angle)*5  // Tốc độ di chuyển theo trục Y
    };
    projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity));
});

startGameBtn.addEventListener('click', () => {
    init();
    animate();
    spawnEnemies();
    modelEl.style.display = 'none';
})