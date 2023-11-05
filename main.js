const prompt = require("prompt-sync")({ sigint: true });
const term = require( 'terminal-kit' ).terminal ;


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*"
;

class Field {
  constructor(battlefield) {
    this._battlefield = battlefield;
    this._locationX = 0;
    this._locationY = 0;
    this._battlefield[0][0] = pathCharacter;
  }

  print() {
    let battlefield = "";
    for (let element of this._battlefield) {
      battlefield += element.join("") + "\n";
    }
    console.log(battlefield);
  }

  playGame() {
    this.print();
    this.direction();
  }

  move(direction) {
    switch (direction) {
      case "U":
        this._locationY -= 1;
        break;
      case "D":
        this._locationY += 1;
        break;
      case "L":
        this._locationX -= 1;
        break;
      case "R":
        this._locationX += 1;
        break;
      default:
        this.direction();
        break;
    }
  }

  isInBounds() {
    return (
      this._locationY >= 0 &&
      this._locationX >= 0 &&
      this._locationY < this._battlefield.length &&
      this._locationX < this._battlefield[0].length
    );
  }

  isHole() {
    return this._battlefield[this._locationY][this._locationX] === hole;
  }

  isHat() {
    return this._battlefield[this._locationY][this._locationX] === hat;
  }

  direction() {
    const question = term.bold.underline.red("Which way? L = Left, R = Right, U = Up, D = Down.")
    const answer = prompt(question).toUpperCase();
    this.move(answer);
    if (!this.isInBounds()) {
      console.log("Out of bounds instruction!");
    } else if (this.isHole()) {
      console.log("Sorry, you fell down a hole!");
    } else if (this.isHat()) {
      console.log("Congrats, you found your hat!");
    } else {
      this._battlefield[this._locationY][this._locationX] = pathCharacter;
      this.playGame();
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
