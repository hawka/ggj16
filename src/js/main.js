var game = new Phaser.Game(1200, 675, Phaser.AUTO, "gameContainer", {preload: preload, create: create, update: update, render: render});

var story_state = {
	"choices": [],
	"currentState": 0
};

var player;
var cursors;

function preload() {
	// load image assets and story text
	game.load.image('background', 'src/assets/alone-snow.jpg');
	game.load.image('background2', 'src/assets/alone-desert.jpg');
	game.load.image('player', 'src/assets/base.gif');
}

function create() {
	game.stage.backgroundColor = '#182d3b';
	game.add.tileSprite(0, 0, 1200, 675, 'background');
	game.add.tileSprite(1200, 0, 2400, 675, 'background2');
	game.world.setBounds(0, 0, 6000, 675);
	game.physics.startSystem(Phaser.Physics.P2JS);

	player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
	game.physics.p2.enable(player);
	cursors = game.input.keyboard.createCursorKeys();
	game.camera.follow(player);
}

function update() {
    player.body.setZeroVelocity();
    if (cursors.up.isDown)
    {
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }
}


function render() {
	game.debug.cameraInfo(game.camera, 32, 32);
	game.debug.spriteCoords(player, 32, 500);
}
