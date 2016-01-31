var game_decisions = {
	loc: "",
};

var parse_sentence = function(pre_text, input_map) {
	var output;
	var choice_tree = {};

	var populate_tree = function(slices, offset, obj, cb) {
		if (offset >= slices.length) {
			return cb;
		}
		var k = slices[offset];
		if (!obj.hasOwnProperty(k)) {
			obj[k] = populate_tree(slices, offset+1, {}, cb)
		} else {
			obj[k] = populate_tree(slices, offset+1, obj[k], cb)
		}
		return obj;
	};

	for (var key in input_map) {
		if (!input_map.hasOwnProperty(key)) {
			continue;
		}
		var slices = key.split("| ");
		choice_tree = populate_tree(slices, 0, choice_tree, input_map[key]);
	}

	var output = {
		"pre_text": pre_text,
		"choice_tree": choice_tree
	};

	return output
};

var start = function () {
	var map = {
		"I | am | alone.": A
	};
};

var A = function () {
	var map = {
		"I | am | cold.": B,
		"I | am | hungry.": C,
		"I | am | lost.": D,
		"I | am | thirsty.": E,
	};
};

var B = function () {
	// TODO change image
	game_decisions.loc = "snow";
};
