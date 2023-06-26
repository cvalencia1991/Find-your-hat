const prompt = require("prompt-sync")({ sigint: true });

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "}
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
        console.log("Enter U, D, L or R.");
        this.direction();
        break;
    }
  }

  direction() {
    readline.question("Which way? ", (direction) => {
      console.log(`You chose ${direction}`);
      this.move(direction);

      myField.print();
      readline.close();
    });
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.playGame();
