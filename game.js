
void setup () {
    size(window.innerWidth, window.innerHeight);
    textFont(createFont('Rowdies'));
    noStroke();
}
width = window.innerWidth;
height = window.innerHeight;

var scene = 'start';
int timer = 0;
var screenshot = null;
var msClicked = false;

var checkDir = function (curDir, newDir) {
    switch (curDir) {
        case 'up':
        if (newDir === 'down') {
            return false;
        } else { return true; }
        break;
        case 'left':
        if (newDir === 'right') {
            return false;
        } else { return true; }
        break;
        case 'down':
        if (newDir === 'up') {
            return false;
        } else { return true; }
        break;
        case 'right':
        if (newDir === 'left') {
            return false;
        } else { return true; }
        break;
    }
};

var Food = function () {
    this.x = floor(random(0, width/20));
    this.y = floor(random(0, height/20));
};
Food.prototype.draw = function () {
    fill(255, 0, 0);
    rect(this.x*20, this.y*20, 20, 20);
};
Food.prototype.move = function () {
    this.x = floor(random(0, width/20));
    this.y = floor(random(0, height/20));
};

var food = new Food();

var Snake = function (){
    this.x = floor(window.innerWidth/20)/2;
    this.y = floor(window.innerHeight/20)/2;
    this.size = 0;
    this.dir = null;
    this.body = [];
};
Snake.prototype.draw = function () {
    fill (0, 0, 255);
    noStroke();
    rect(this.x*20, this.y*20, 20, 20);
    fill(200);
    for (var i = 0; i < this.size; i++) {
    switch (this.dir) {
        case 'up':
            rect(this.x*20, (this.y+i+1)*20, 20, 20);
            break;
        case 'left':
            rect((this.x+i+1)*20, this.y*20, 20, 20);
            break;
        case 'down':
            rect(this.x*20, (this.y-i-1)*20, 20, 20);
            break;
        case 'right':
            rect((this.x-i-1)*20, this.y*20, 20, 20);
            break;
    }
    }

    textAlign(LEFT, TOP);
    fill(0);
    textSize(40);
    text('Score: '+snake.size, 10, 10);
};
Snake.prototype.die = function () {
    this.x = floor(window.innerWidth/20)/2;
    this.y = floor(window.innerHeight/20)/2;
    this.size = 0;
    this.dir = null;
    timer = 0;
    screenshot = null;
}
Snake.prototype.move = function () {
    switch (this.dir) {
        case 'up':
            this.y--;
            break;
        case 'left':
            this.x--;
            break;
        case 'down':
            this.y++;
            break;
        case 'right':
            this.x++;
            break
    }
    if (this.x < 0 || this.x > width/20 || this.y < 0 || this.y > height/20) {
        screenshot = get(0, 0, width, height);
        scene = 'gameOver';
    }
};
Snake.prototype.change = function () {
    switch (key) {
        case 'w':
            //if (checkDir(this.dir), 'up') {
                this.dir = 'up';
                this.body.push(this.dir);
            //}
            break;
        case 'a':
            //if (checkDir(this.dir), 'left') {
                this.dir = 'left';
                this.body.push(this.dir);
            //}
            break;
        case 's':
            //if (checkDir(this.dir), 'down') {
                this.dir = 'down';
                this.body.push(this.dir);
            //}
            break;
        case 'd':
            //if (checkDir(this.dir), 'right') {
                this.dir = 'right';
                this.body.push(this.dir);
            //}
            break;
   }
};
Snake.prototype.collide = function () {
    if (this.x*20 === food.x*20 && this.y*20 === food.y*20) {
        this.size++;
        food.move();
    }
};

var snake = new Snake();

void draw () {
    switch (scene) {
        case 'start':
            background(0, 255, 0);
            fill(0);
            textAlign(CENTER);
            textSize(100);
            text('Click to Play', width/2, height/2);
            if (msClicked === true) {
                scene = 'game';
            }
            break;
        case 'game':
            background(0, 255, 0);
            food.draw();
            snake.draw();
            if (timer%8 == 0) {
                snake.move();
                snake.collide();
            }
            if (keyPressed) {
                snake.change();
            }
            timer = timer +1;
            break;
        case 'gameOver':
            fill(0);
            image(screenshot, 0, 0);
            textAlign(CENTER);
            textSize(100);
            text('Game Over!', width/2, height/2);
            text("GG. Press 'r' to restart.", width/2, height/2+100);
            if (keyPressed) {
                if (key === 'r' || key === 'R') {
                    snake.die();
                    scene = 'game';
                }
            }
            break;
    }
    msClicked = false;
};

void mouseClicked () {
    msClicked = true;
};
