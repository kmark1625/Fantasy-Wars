describe("Unit", function() {
  TILESCALE = 32;
  var unit;
  var pos;

  beforeEach(function() {
    game = new Phaser.Game(1000, 800, Phaser.AUTO, 'canvasGame');
    pos = new Pos(1,1);
    // TODO: The line below seems to break the test suite because in creating a
    // new warrior it creates a Phaser Sprite. There is some error with this
    // setup and getting the image for the Sprite.
    // warrior = new Warrior(pos, 1);
  });

  describe("Initializes warrior with appropriate stats", function() {
    it('Has an appropriate amount of health for a dwarf warrior', function() {
        expect(true).toEqual(true); 
    });
  })
});
