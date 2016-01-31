var game_decisions = {
	loc: "",
};

var parseSentence = function(map) {
	// TODO
};

var start = function () {
	var map = {
		"I am alone. ⇛": A
	};
};

var A = function () {
	var map = {
		"I | am | cold. ⇛": B,
		"I | am | hungry. ⇛": C,
		"I | am | lost. ⇛": D,
	};
};

var B = function () {
	// TODO change image
	game_decisions.loc = "snow";
};
