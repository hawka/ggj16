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

function preload() {
  // load image assets and story text
  game.load.image('alone', 'src/assets/alone-desert.jpg');
  game.load.image('snow', 'src/assets/alone-snow.jpg');
  game.load.image('desert', 'src/assets/alone-desert.jpg');
}

function create() {
  game.stage.backgroundColor = '#182d3b';
  game.add.tileSprite(0, 0, 1200, 675, 'alone');
  newScreen(testScreen1);
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
  if (s == null) {
    return //FIXME
  }
  currentScope = s;
  var first = [];
  var y = 32;
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

// TODO break up, encapsulate
function newScreen(s) {
  console.log("NEW SCREEN", s);
  currentScreen = s;
  nextToken(s)
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
  



function clearState(){
    for (i in textState) {
      textState[i].destroy();
    }
    textState = [];
}

//TODO encapsulate
function wordClickLatest(item) {
  //set to decided
  token = item.token
  x = item.x
  clearState()
  t = game.add.text(x, 32, token, { font: font, fill: '#ffffff', align: "left"});
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


var testScreen1 = {
  "I ": { "am ": {"alone.": function(){return testScreen2}}},
  "We ": { "are.": null, "remember the way it was.": null},
  "A cool guy ": { "are.": null, "remember the way it was.": null},
}
var testScreen2 = {"done.": null}

