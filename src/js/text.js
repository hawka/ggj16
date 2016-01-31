var game_decisions = {
	loc: "",
	agr: 0, // agriculture
	mil: 0, // military
	dip: 0, // diplomacy
	hun: 0, // hunting
	too: 0, // tools + tech
	art: 0, // art
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

	return output;
};

var start = function () {
	var inmap = {
		"I | am | alone.": A
	};
	return parse_sentence("", inmap);
};

var A = function () {
	var pretext = "I am alone. \n"
	var inmap = {
		"I | am | cold.": B,
		"I | am | hungry.": C,
		"I | am | lost.": D,
		"I | am | thirsty.": E,
	};
	return parse_sentence(pretext, inmap);
};

// Tundra tree.
var B = function () {
	game_decisions.loc = "snow";
	var pretext = "I am alone. \n I am cold. \n";
	var inmap = {
		// TODO
	};
	return parse_sentence(pretext, inmap);
};

// Forest tree.
var C = function () {
	game_decisions.loc = "forest";
	var pretext = "I am alone. \n I am hungry. \n";
	var inmap = {
		"I | scavenge | for edible plants.": Cb,
		"I | gather | wood grubs and worms.": Cc,
		"I | try to | catch a rabbit.": Cd
	};
	return parse_sentence(pretext, inmap);
};

var Cb = function() {
	var pretext = "One of the plants makes me sick, but the others are good. \n"
	game_decisions.agr += 1;
	var inmap = {
		"The sun | is | setting.": C_a,
		"The sun | is | hidden.": C_a,
		"I | need | shelter.": C_a
	};
	return parse_sentence(pretext, inmap);
};

var Cc = function() {
	var pretext = "I grind the grubs into a paste and scoop it into my mouth. \n";
	game_decisions.too += 1;
	var inmap = {
		"The sun | is | setting.": C_a,
		"The sun | is | hidden.": C_a,
		"I | need | shelter.": C_a
	};
	return parse_sentence(pretext, inmap);
};

var Cd = function() {
	var pretext = "It takes hours, but I finally manage to catch a small rabbit. \n";
	game_decisions.hun += 1;
	var inmap = {
		"I | eat | it raw.": Ce,
	};
	return parse_sentence(pretext, inmap);
};

var Ce = function() {
	var inmap = {
		"The sun | is | setting.": C_a,
		"The sun | is | hidden.": C_a,
		"I | need | shelter.": C_a
	};
	return parse_sentence("", inmap);
};

var C_a = function() {
	var inmap = {
	};
	return parse_sentence("", inmap);
};

// Harbor tree.
var D = function () {
	game_decisions.loc = "drown";
	var pretext = "I am alone. \n I am lost. \n";
	var inmap = {
		"I | was | drowning.": Da,
		"I | remember | a storm.": Da,
		"I | remember | a wave.": Da,
		"I | remember | nothing.": Da
	};
	return parse_sentence(pretext, inmap);
};

var Da = function() {
	// TODO
};

// Desert tree.
var E = function() {
	game_decisions.loc = "desert";
	var pretext = "I am alone. \n I am thirsty. \n";
	var inmap = {
		"I | look to | the sky.": Ea,
		"I | look to | the ground.": Eb,
	};
	return parse_sentence(pretext, inmap);
};

var Ea = function() {
	var pretext = "I am thirsty. \n"
	var inmap = {
		"I | see | birds circling to the north. \n": E_a,
	};
	return parse_sentence(pretext, inmap);
};

var Eb = function() {
	var pretext = "I am thirsty. \n"
	var inmap = {
		"I | notice | animal tracks leading north. \n": E_a,
		"I | follow | a dry river bed. \n": E_a,
	};
	return parse_sentence(pretext, inmap);
};

var E_a = function() {
	game_decisions.loc = "oasis";
	var inmap = {
		"I | find | an oasis.": E_b;
	};
	return parse_sentence("", inmap);
};
