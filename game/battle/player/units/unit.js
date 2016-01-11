Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

function Unit(pos, player) {
  this.player = player;
  this.pos = pos;
  this.health = 100;
  this.speed = 3;
  this.movedThisTurn = false;
  this.range = [1, 1];
  this.walkPath = [];
  // Phaser.Sprite.call(this, game, pos.canvasX, pos.canvasY, 'spritename');
};

Unit.prototype.updateUnit = function(map) {
  //TODO: Update method
  if(this.walkPath.length === 0) {
    this.animations.play("stand");
    this.x = this.pos.canvasX();
    this.y = this.pos.canvasY();
  }
};

Unit.prototype.move = function() {
  // Moves unit along path
  // path is in the format: [location1, location2, ..., targetLocation]
  this.animations.play("move");
  var nextTile = this.walkPath[this.walkPath.length - 1];
  if (!nextTile)
    return true;
  if (nextTile.canvasX() > this.x)
    this.x += 2;
  if(nextTile.canvasX() < this.x)
    this.x -= 2;
  if(nextTile.canvasY() > this.y)
    this.y += 2;
  if(nextTile.canvasY() < this.y)
    this.y -= 2;
  if(nextTile.canvasX() === this.x && nextTile.canvasY() === this.y) {
    this.pos.x = this.walkPath[this.walkPath.length - 1].x;
    this.pos.y = this.walkPath[this.walkPath.length - 1].y;
    this.walkPath.pop();
  }
  if (this.walkPath.length === 0) {
    var gray = game.add.filter('Gray');
    this.filters = [gray];
    this.movedThisTurn = true;
  }
  return (this.walkPath.length === 0);
};

Unit.prototype.attack = function(pos) {
  //TODO: Attack enemy unit
};

Unit.prototype.getPossibleMoves = function(pos, map) {

  var that = this;
  var finalArray = [pos]; // valid positions to move into
  var closed = []; // previously searched positions
  var moved = [0]; // cost of movement

  var x = 0;

  while (closed.length < finalArray.length) {
    // for each square, find the possible next moves
    this.getSurroundingPos(finalArray[x]).forEach(function(position) {
      // if those moves are valid (terrain and grid)
      if(map.posValid(position)) {
        // if the position has not already been counted
        if(!that.arrayIncludesPosition(finalArray, position)) {
          // if potential cost of movement exceeds speed, do not add to possible valid moves
          if(moved[finalArray.indexOf(finalArray[x])] + map.getPenaltyAtPos(position, that) <= that.speed) {
            // otherwise, add to possible valid moves
            finalArray.push(position);
            // add the corresponding movement cost to moved array
            moved.push(moved[finalArray.indexOf(finalArray[x])] + map.getPenaltyAtPos(position, that));
          }
        }
      }
    });
    // if the position hasn't already been found, add to closed array
    if(!this.arrayIncludesPosition(closed, finalArray[x]))
      closed.push(finalArray[x]);
    x++;
  }

  return finalArray;
}

Unit.prototype.arrayIncludesPosition = function(array, pos) {
  var included = false;
  array.forEach(function(item) {
    if(pos.equals(item)) {
      included = true;
      return;
    }
  });
  return included;
}

Unit.prototype.getSurroundingPos = function(pos) {
  // Returns an array of positions surrounding the input position
  return [new Pos(pos.x, pos.y + 1, pos), // top
          new Pos(pos.x + 1, pos.y, pos), // right
          new Pos(pos.x, pos.y - 1, pos), // bottom
          new Pos(pos.x - 1, pos.y, pos) // left
  ];
};

Unit.prototype.getPossibleAttacks = function(map) {

  var finalArray = [];

  for(var x = this.pos.x - this.range[1]; x < this.pos.x + this.range[1]; x++) {
    for(var y = this.pos.y - this.range[1]; y < this.pos.y - this.range[1]; y++) {
      newPos = new Pos(x, y);
      if(map.posValid(pos) && this.distanceTo(newPos) >= this.range[0] && this.distanceTo(newPos) <= this.range[1])
        finalArray.push(pos);
    }
  }
  return finalArray;
};

Unit.prototype.distanceTo = function(pos) {
  return (Math.abs(this.pos.x - pos.x) + Math.abs(this.pos.y - pos.y));
}

Unit.prototype.takeDamage = function(damage) {
  // Updates unit health based on damage.
  this.health -= damage;
  if (this.health <= 0) {
    this.die();
  }
};

Unit.prototype.getHealthNumber = function() {
  // Translates health percentage into a displayable number 1-10.
  // 95 => 10, 5=>1, 55 => 6
  return Math.ceil(this.health / 10) //TODO: fix health denomination
};

Unit.prototype.getAttackDamage = function(pos) {
  //TODO: Returns attack damage based on formula for attack type and defense.
};

Unit.prototype.die = function(pos) {
  //TODO: Destroys unit and removes from map
  this.destroy(); // FIXME: scope differently
}

Unit.prototype.resetUnit = function() {
  // Resets unit at the end of a player's turn
  this.movedThisTurn = false;
  this.filters = null;
}
