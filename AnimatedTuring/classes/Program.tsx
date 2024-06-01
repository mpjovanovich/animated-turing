/* ****************************************************************
 * The mFunction class is a recursive data structure that represents an "entry" from one of Turing's program tables.
 *
 * An example program looks something like this:
 * {
 *   symbolResultion1: [{operation1}, "m-config1"],
 *   symbolResultion2: [{operation2, operation3}, "m-config2"],
 *   ...
 * }
 *
 * For example:
 * {
 *   None: [{P0}, "b"],
 *   0: [{R, R, P1}, "b"],
 *   1: [{R, R, P0}, "b"],
 * }
 *
 * I shall refer to each of the items in the outermost dictionary as a "branch" of the program:
 * -  None: [{P0}, "b"]
 *
 * I shall refer to the tuple of operations and final m-config as an "action":
 * - [{P0}, "b"]
 *
 * Per Turing, symbol resolution strings shall be encoded in the form:
 * - "Any", any symbol
 * - "None", an empty square
 * - "s", the exact symbol
 * - "not s", any symbol other than "symbol"
 * , where "s" is some symbol.
 *
 * Please refer to the Operations enum to see the available operations.
 *
 * The final m-config is another instance of the program class.
 * **************************************************************** */
export enum Operation {
  PRINT0 = "Print 0",
  PRINT1 = "Print 1",
  PRINT_SCHWA = "Print Schwa",
  PRINTX = "Print X",
  ERASE = "Erase",
  LEFT = "Move Left",
  RIGHT = "Move Right",
}

export class mFunction {
  private branches: Map<String, [Operation[], mFunction]> = new Map();

  addBranch(
    symbol: string,
    operations: Operation[],
    finalMConfig: mFunction
  ): void {
    this.branches.set(symbol, [operations, finalMConfig]);
  }

  getAction(symbol: string): [Operation[], mFunction] | undefined {
    return this.branches.get(symbol);
  }
}

// // A Program is really just a linked list of mFunctions.
// export class Program {
//   initialConfig: mFunction;

//   constructor(initialConfig: mFunction) {
//     this.initialConfig = initialConfig;
//   }
// }
