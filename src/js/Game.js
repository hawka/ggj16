var Alone = Alone || {};

Alone.Game = function() {
	"use strict";
	Phaser.State.call(this);
};

Alone.Game.prototype = Object.create(Phaser.State.prototype);
Alone.Game.prototype.constructor = Alone.Game;

Alone.Game.prototype.preload = function () {
	"use strict";
	// TODO game.load etc?
};

