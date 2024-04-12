/*
This class represents a Turing machine.

Terminology:
- Tape = an infinite array of squares 
- Square = a cell in the tape
- r = index of the current square

*/

/* The machine can do the following:
- Print
- Erase
- Move left
- Move right
- Stay
*/
enum Operation {
  PRINT0 = "P0",
  PRINT1 = "P1",
  ERASE = "E",
  LEFT = "L",
  RIGHT = "R",
}

class Behavior {
  operations: Operation[];
  finalMConfig: string;

  constructor(operations: Operation[], finalMConfig: string) {
    this.operations = operations;
    this.finalMConfig = finalMConfig;
  }
}

class TuringMachine {
  mConfig: string;
  tape: string[];
  r: number = 0;

  constructor(mConfig: string) {
    this.tape = [""];
    this.r = 0;
    this.mConfig = mConfig;
  }

  // We will just combine the mConfig and symbol into a single key.
  // This will eventually be passed in as the "program" to run.
  readonly instructionMap: Map<string, Behavior> = new Map([
    ["b", new Behavior([Operation.PRINT0, Operation.RIGHT], "c")],
    ["c", new Behavior([Operation.RIGHT], "e")],
    ["e", new Behavior([Operation.PRINT1, Operation.RIGHT], "k")],
    ["k", new Behavior([Operation.RIGHT], "b")],
  ]);

  readonly operationMap: Map<Operation, () => void> = new Map([
    [
      Operation.PRINT0,
      () => {
        this.printToTape("0");
      },
    ],
    [
      Operation.PRINT1,
      () => {
        this.printToTape("1");
      },
    ],
    [
      Operation.ERASE,
      () => {
        this.printToTape("");
      },
    ],
    [Operation.LEFT, () => this.moveLeft()],
    [Operation.RIGHT, () => this.moveRight()],
    [Operation.STAY, () => {}],
  ]);

  scan(): void {
    // Get the behavior that maps to the current mConfig and symbol
    const configSymbol = this.mConfig + this.tape[this.r];
    const behavior = this.instructionMap.get(configSymbol);

    // Execute the operations
    if (behavior) {
      behavior.operations.forEach((operation) => {
        const operationFunction = this.operationMap.get(operation);
        if (operationFunction) {
          operationFunction();
        } else {
          throw new Error("No operation found for operation: " + operation);
        }
      });
      this.mConfig = behavior.finalMConfig;
    } else {
      throw new Error("No behavior found for configSymbol: " + configSymbol);
    }

    // Debug
    this.printState();
  }

  moveLeft(): void {
    this.r--;
    if (this.r < 0) {
      this.tape.unshift("");
      this.r = 0;
    }
  }

  moveRight(): void {
    this.r++;
    if (this.r >= this.tape.length) {
      this.tape.push("");
    }
  }

  printToTape(symbol: string): void {
    this.tape[this.r] = symbol;
  }

  printState(): void {
    this.printTape();
    console.log("mConfig: ", this.mConfig);
    // Not needed because we're showing it on the tape printout
    // console.log("r: ", this.r);
  }

  printTape(): void {
    let tapeString = "";
    for (let i = 0; i < this.tape.length; i++) {
      let currentSquareOutput = `[${this.tape[i] ? this.tape[i] : " "}]`;
      if (i === this.r) {
        // This will do for now to highlight the current square
        currentSquareOutput = `[${currentSquareOutput}]`;
      }
      tapeString += currentSquareOutput + " ";
    }
    console.log(tapeString);
  }
}

export default TuringMachine;
