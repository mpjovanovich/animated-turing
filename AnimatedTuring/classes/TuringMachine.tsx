import { ConfigMap, Operation } from "./ConfigMap";

export default class TuringMachine {
  currentMFunction: ConfigMap;

  // Terminology per Turing's original paper:
  // the "machine configuration" or "state" of the machine
  //   mConfig: ConfigMap;

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
    initialMConfig: ConfigMap
    // onTapeWrite: (tape: string[]) => void,
    // onMCConfigChange: (mConfig: string) => void,
    // onRMove: (r: number) => void
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
    const behavior = this.currentMFunction.getBehavior(this.tape[this.r]);
    if (!behavior) {
      throw new Error("No behavior found for symbol: " + this.tape[this.r]);
    }

    // Execute the operations
    behavior.operations.forEach((operation) => {
      const operationFunction = this.operationFunction.get(operation);
      if (operationFunction) {
        operationFunction();
      } else {
        throw new Error("No operation found for operation: " + operation);
      }
    });

    this.currentMFunction = behavior.finalMConfig;
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
