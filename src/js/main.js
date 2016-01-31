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

function newScreen(s) {
  if (s == null) {
    return
  }
  console.log("NEW SCREEN", s)
  screen = s;
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

function clearState(){
    for (i in textState) {
      textState[i].destroy();
    }
    textState = [];
}


function wordClickLatest(item) {
  //set to decided
  token = item.token
    console.log("W:", item.width)
  x = item.x
  clearState()
  t = game.add.text(x, 32, token, { font: font, fill: '#ffffff', align: "left"});
 game.debug.body(t)
  oldStates.push(t);
  newScreen(screen[token]);
}

function hoverChoice(item) {
  item.fill = "#ffff44"; //TODO colors
}
function endHoverChoice(item) {
  item.fill = "#ffffff"; //TODO colors
}


var testScreen1 = {
  "I ": { "am ": {"alone.": function(){return testScreen2}}},
  "We ": { "are.": null, "remember the way it was.": null},
  "A cool guy ": { "are.": null, "remember the way it was.": null},
}
var testScreen2 = {"done.": null}

