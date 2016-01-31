var game_decisions = {
	loc: "",
};

var parseSentence = function(map) {
	// TODO turn this example into a thing that happens.
	var input_text = "I am alone. \n"
	var input = {
		"I | am | cold. ⇛": B,
		"I | am | hungry. ⇛": C,
		"I | am | lost. ⇛": D,
	};
	var output = {
		choice_tree: {
			pre_text: "I am alone. \n",
			"I": {
				"am:" {
					"cold.": "B",
					 "hungry.": "C"
				},
				"was": {
				},
			},
		},
	}
};

var start = function () {
	var map = {
		"I | am | alone. ⇛": A
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
