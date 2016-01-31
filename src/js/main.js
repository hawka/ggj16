var game = new Phaser.Game(1200, 675, Phaser.AUTO, "gameContainer", {preload: preload, create: create, update: update, render: render});

function preload() {
	// load image assets and story text
	game.load.image('alone', 'src/assets/alone.jpg');
	game.load.image('snow', 'src/assets/alone-snow.jpg');
	game.load.image('desert', 'src/assets/alone-desert.jpg');
}

function create() {
	game.stage.backgroundColor = '#182d3b';
	game.add.tileSprite(0, 0, 1200, 675, 'alone');
}

function update() {
	// TODO: update next "background" based on decision
	// TODO: update text - prefab
	// TODO: update text - player choice
}


function render() {
	// TODO
}
