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

// It's helpful for me to think of operations in terms of state-action pairs
// Each state (mConfig, symbol) maps to an action
export class Action {
  operations: Operation[];
  finalMConfig: string;

  constructor(operations: Operation[], finalMConfig: string) {
    this.operations = operations;
    this.finalMConfig = finalMConfig;
  }
}

export interface Program {
  // The starting configuration of the machine
  initialConfig: string;

  // This is a map of the form "mConfig-symbol" to Action -
  // the state-action pairs
  actions: Map<string, Action>;

  // There are often many inputs that map to a single Action.
  // We represent state as a string, but that string can imply multiple states.
  // - e.g. "not 0" or "any value"
  // This allows for a function to be called to resolve the mConfig and symbol
  // to something in the actions map.
  symbolResolutionFunctions: Map<string, (s: string) => string>;
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
    // Get the action that maps to the current mConfig and symbol
    // const configSymbol = `${this.mConfig}-${this.tape[this.r]}`;
    // const configSymbol = this.program.symbolResolutionFunctions.get(this.mConfig)(this.tape[this.r]);

    const symbolResolutionFunction = this.program.symbolResolutionFunctions.get(
      this.mConfig
    );
    if (!symbolResolutionFunction) {
      throw new Error(
        `No symbol resolution function found for mConfig: ${this.mConfig}`
      );
    }

    // Get the configSymbol by calling the function
    const configSymbol = symbolResolutionFunction(this.tape[this.r]);
    const action = this.program.actions.get(configSymbol);
    if (!action) {
      throw new Error("No action found for configSymbol: " + configSymbol);
    }

    // Execute the operations
    action.operations.forEach((operation) => {
      const operationFunction = this.operationFunction.get(operation);
      if (operationFunction) {
        operationFunction();
      } else {
        throw new Error("No operation found for operation: " + operation);
      }
    });
    this.mConfig = action.finalMConfig;

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
