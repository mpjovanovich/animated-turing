import { mFunction, Operation } from "./Program";

export class TuringMachine {
  //   // Call stack
  //   stack: Program[] = [];

  currentMFunction: mFunction;

  // Terminology per Turing's original paper:
  // the "machine configuration" or "state" of the machine
  //   mConfig: mFunction;

  // An infinite tape of symbols
  // Note: We will use a mutable backing store for the tape, but return a new copy of the tape
  // where it is consumed.
  tape: string[];

  // The current position of the read/write head
  r: number = 0;

  //   // Event handlers
  //   onTapeWrite: (tape: string[]) => void;
  //   onMCConfigChange: (mConfig: string) => void;
  //   onRMove: (r: number) => void;

  constructor(
    initialMConfig: mFunction,
    onTapeWrite: (tape: string[]) => void,
    onMCConfigChange: (mConfig: string) => void,
    onRMove: (r: number) => void
  ) {
    this.tape = [""];
    this.r = 0;
    this.currentMFunction = initialMConfig;
    // this.onTapeWrite = onTapeWrite;
    // this.onMCConfigChange = onMCConfigChange;
    // this.onRMove = onRMove;
  }

  readonly operationFunction: Map<Operation, () => void> = new Map([
    [
      Operation.PRINT0,
      () => {
        this.writeToTape("0");
      },
    ],
    [
      Operation.PRINT1,
      () => {
        this.writeToTape("1");
      },
    ],
    [
      Operation.PRINT_SCHWA,
      () => {
        this.writeToTape("ə");
      },
    ],
    [
      Operation.PRINTX,
      () => {
        this.writeToTape("x");
      },
    ],
    [
      Operation.ERASE,
      () => {
        this.writeToTape("");
      },
    ],
    [Operation.LEFT, () => this.moveLeft()],
    [Operation.RIGHT, () => this.moveRight()],
  ]);

  scan(): void {
    const tapeSymbol = this.tape[this.r];

    //   // Get the action that maps to the current mConfig and symbol
    //   const symbolResolutionFunction = this.program.symbolResolutionFunctions.get(
    //     this.mConfig
    //   );
    //   if (!symbolResolutionFunction) {
    //     throw new Error(
    //       `No symbol resolution function found for mConfig: ${this.mConfig}`
    //     );
    //   }

    //   // configSymbol is the combination of the mConfig and the symbol at the current position.
    //   // This will map to a single action (set of operations and final mConfig).
    //   // Get the configSymbol by calling the function
    //   const configSymbol = symbolResolutionFunction(this.tape[this.r]);
    //   const action = this.program.actions.get(configSymbol);
    //   if (!action) {
    //     throw new Error("No action found for configSymbol: " + configSymbol);
    //   }

    //   // Execute the operations
    //   action.operations.forEach((operation) => {
    //     const operationFunction = this.operationFunction.get(operation);
    //     if (operationFunction) {
    //       operationFunction();
    //     } else {
    //       throw new Error("No operation found for operation: " + operation);
    //     }
    //   });

    //   this.mConfig = action.finalMConfig;
    //   this.onMCConfigChange(this.mConfig);

    // Debug
    this.printState();
  }

  moveLeft(): void {
    this.r--;
    if (this.r < 0) {
      this.tape = [...this.tape];
      this.tape.unshift("");
      this.r = 0;
    }
    // this.onRMove(this.r);
  }

  moveRight(): void {
    this.r++;
    if (this.r >= this.tape.length) {
      this.tape.push("");
      //   this.onTapeWrite([...this.tape]);
    }
    // this.onRMove(this.r);
  }

  writeToTape(symbol: string): void {
    this.tape[this.r] = symbol;
    // this.onTapeWrite([...this.tape]);
  }

  printState(): void {
    this.printTape();
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
