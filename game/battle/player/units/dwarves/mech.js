Mech.prototype = new UnitInfantry();
Mech.prototype.constructor = Mech;

function Mech(pos) {
  this.pos = pos;
  Phaser.Sprite.call(this, game, pos.canvasX(), pos.canvasY(), "sprDwarves");
  game.add.existing(this);
  this.animations.add("stand", [20, 21], 2);
  this.animations.add("move", [22, 23], 8);
  this.animations.add("attack", [24, 25], 8);
  this.name = "Dwarf Mech";
  this.health = 100;
  this.attack = 100;
  this.defense = 0.20;
  this.speed = 2;
  this.range = [1,2];
  this.cost = 200;
}
