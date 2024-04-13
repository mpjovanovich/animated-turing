/* The machine can do the following:
- Print
- Erase
- Move left
- Move right
- Stay
*/
export enum Operation {
  PRINT0,
  PRINT1,
  PRINT_SCHWA,
  PRINTX,
  ERASE,
  LEFT,
  RIGHT,
}

export class Behavior {
  operations: Operation[];
  finalMConfig: string;

  constructor(operations: Operation[], finalMConfig: string) {
    this.operations = operations;
    this.finalMConfig = finalMConfig;
  }
}

export interface Program {
  initialConfig: string;
  behaviors: Map<string, Behavior>;
}

export class TuringMachine {
  program: Program;

  // Terminology per Turing's original paper:
  // the "machine configuration" or "state" of the machine
  mConfig: string;

  // An infinite tape of symbols
  tape: string[];

  // The current position of the read/write head
  r: number = 0;

  constructor(program: Program) {
    this.tape = [""];
    this.r = 0;
    this.program = program;
    this.mConfig = program.initialConfig;
  }

  readonly operationFunction: Map<Operation, () => void> = new Map([
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
      Operation.PRINT_SCHWA,
      () => {
        this.printToTape("ə");
      },
    ],
    [
      Operation.PRINTX,
      () => {
        this.printToTape("x");
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
  ]);

  scan(): void {
    // Get the behavior that maps to the current mConfig and symbol
    const configSymbol = `${this.mConfig}-${this.tape[this.r]}`;
    const behavior = this.program.behaviors.get(configSymbol);

    // Execute the operations
    if (behavior) {
      behavior.operations.forEach((operation) => {
        const operationFunction = this.operationFunction.get(operation);
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
