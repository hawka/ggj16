var config = {
    "width": 1200,
    "height": 675,
    "renderer": Phaser.CANVAS,
    "parent": 'gameContainer',
    "resolution": window.devicePixelRatio,
    state: {
      preload: preload,
      create: create,
      update: update,
      render: render,
    }};

var game = new Phaser.Game(config);
// textState is an arrays of text Objects
var textState = []
var oldStates = []
var font = "Bold 72px Consolas"
var font_px = 90
var screen = {}
var bg;
var preText = "";

function preload() {
  // load image assets and story text
  game.load.script('levels', 'src/js/text.js')
  game.load.image('alone', 'src/assets/alone-desert.jpg');
  game.load.image('snow', 'src/assets/alone-snow.jpg');
  game.load.image('drown', 'src/assets/alone-drown.jpg');
  game.load.image('forest', 'src/assets/alone-forest.jpg');
  game.load.image('desert', 'src/assets/alone-desert.jpg');
  game.load.image('desert-birds', 'src/assets/desert-birds.jpg');
}

function create() {
  game.stage.backgroundColor = '#182d3b';
  bg = game.add.tileSprite(0, 0, 1200, 675, 'alone');
  newScreen(start());
}

function update() {
  // TODO: update next "background" based on decision
  // TODO: update text - prefab
  // TODO: update text - player choice
}


function render() {
  // TODO
}

function nextToken(s) {
  if (typeof s === "function") {
    newScreen(s());
    return
  }
  if (s == null) {
    return //FIXME
  }
  currentScope = s;
  var first = [];
  var y = preText.bottom;
  var x = 32;
  if (oldStates.length > 0) {
    x = (oldStates[oldStates.length-1].width/2 + oldStates[oldStates.length-1].x);
  }
  for (w in s) {
    var t = game.add.text(x, y, w, { font: font, fill: '#ffffff', align: "left" });
    t.token = w;
    t.inputEnabled = true;
    t.input.useHandCursor = true;
    t.events.onInputOver.add(hoverChoice, this);
    t.events.onInputOut.add(endHoverChoice, this);
    t.events.onInputDown.add(wordClickLatest, this);
    first.push(t);
    y += font_px;
  }
  textState = first;
}


var currentScreen;
var currentScope;

function newScreen(scene) {
  clearScene();
  console.log("NEW SCREEN", scene);
	bg.loadTexture(game_decisions.loc)
  preText = game.add.text(32, 32, scene.pre_text, { font: font, fill: '#ffffff', align: "left" });
  if (!scene.pre_text) {
    preText.height = 0
  }
  
  currentScreen = scene.choice_tree;
  nextToken(currentScreen);
}

function resetToken(w) {
  var i = 0;
  var scope = currentScreen;
  clearState();

  // iterate til we find the token
  while (oldStates[0].token != w) {
    scope = scope[oldStates[i].token];
    i++;
  } 

  // kill the remaining tokens
  var j = i;
  while (j < oldStates.length) {
    oldStates[j].destroy();
    j++;
  }
  oldStates = oldStates.slice(0,i);

  // set current token
  nextToken(scope)
}
  
function clearScene(){
  if (preText) {
    preText.destroy();
  }
  clearState();
  for (i in oldStates) {
    oldStates[i].destroy();
  }
  oldStates = [];
}


function clearState(){
    for (i in textState) {
      textState[i].destroy();
    }
    textState = [];
}

//TODO encapsulate
function wordClickLatest(item) {
  //set to decided
  token = item.token;
  x = item.x;
  y = item.y
  clearState();
  t = game.add.text(x, y, token, { font: font, fill: '#ffffff', align: "left"});
  t.token = token;
  t.inputEnabled = true;
  t.input.useHandCursor = true;
  t.input.pixelPerfectOver = true;
  t.events.onInputOver.add(hoverOldChoice, this);
  t.events.onInputOut.add(endHoverChoice, this);
  t.events.onInputDown.add(resetChoice, this);
  console.log(t.input);
  oldStates.push(t);
  nextToken(currentScope[token]);
}

function hoverChoice(item) {
  item.fill = "#ffff44"; //TODO colors
}
function endHoverChoice(item) {
  item.fill = "#ffffff"; //TODO colors
}

function hoverOldChoice(item) {
  item.fill = "#ff4444"; //TODO colors
}

function resetChoice(item) {
  resetToken(item.token)
}
