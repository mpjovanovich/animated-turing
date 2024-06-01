/* ****************************************************************
 * The Program class is a recursive data structure that represents a Turing program.
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
 * - "s" = "symbol", the exact symbol
 * - "!s" = "not symbol", any symbol other than "symbol"
 * - "" = "None", an empty square
 * , where "s" is some symbol.
 *
 * Please refer to the Operations enum to see the available operations.
 *
 * The final m-config is another instance of the program class.
 * **************************************************************** */

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

export class Program {
  branches: Map<string, [Operation[], Program]> = new Map();

  constructor(branches: Map<string, [Operation[], Program]>) {
    this.branches = branches;
  }
}
