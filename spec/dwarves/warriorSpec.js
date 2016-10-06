describe("Unit", function() {
  var unit;
  var pos;

  beforeEach(function() {
    pos = new Pos(1,1);
    //warrior = new Warrior(pos, 1);
  });

  describe("Initializes warrior with appropriate stats", function() {
    xit('Has an appropriate amount of health for a dwarf warrior', function() {
        expect(warrior.health).toEqual(100); 
    });
  })
});
