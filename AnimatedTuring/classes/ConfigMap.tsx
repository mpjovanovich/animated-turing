/* ****************************************************************
 * The ConfigMap class is a recursive data structure that represents an "entry" from one of Turing's program tables.
 *
 * An example program looks something like this:
 * {
 *   symbolResultion1: {operation1}, "m-config1",
 *   symbolResultion2: {operation2, operation3}, "m-config2",
 *   ...
 * }
 *
 * For example:
 * {
 *   None: {P0}, "b",
 *   0: {R, R, P1}, "b",
 *   1: {R, R, P0}, "b",
 * }
 *
 * I shall refer to each of the items in the outermost dictionary as a "branch" of the program:
 * -  None: {P0}, "b"
 *
 * I shall refer to the tuple or operations / final m-config as a "behavior"
 * per Turing's tables.
 *
 * Per Turing, symbol resolution strings shall be encoded in the form:
 * - "Any" = any symbol
 * - "None" = an empty square
 * - "s" = the exact symbol
 * - "not s" = any symbol other than "symbol"
 * , where "s" is some symbol.
 *
 * Please refer to the Operations enum to see the available operations.
 *
 * The final m-config is another instance of the ConfigMap class.
 * **************************************************************** */
export enum Operation {
  PRINT0 = "P0",
  PRINT1 = "P1",
  PRINT_SCHWA = "Pə",
  PRINTX = "Px",
  ERASE = "E",
  LEFT = "L",
  RIGHT = "R",
}

export interface Behavior {
  operations: Operation[];
  finalMConfig: ConfigMap;
}

export interface Branch {
  symbol: string;
  behavior: Behavior;
}

export class ConfigMap {
  private branches: Branch[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  addBranch(
    symbol: string, // symbol may be the symbol itself or a lookup variable
    operations: Operation[],
    finalMConfig: ConfigMap
  ): void {
    this.branches.push({ symbol, behavior: { operations, finalMConfig } });
  }

  getBehavior(symbol: string): Behavior | undefined {
    // For some machines we may have to alter Turing's tables. They seem to be inconsistent when
    // using 'not a symbol, and 'None'.
    // E.g: given {x, y, not x nor y}, we'd instead use {x, y, Any, None}

    symbol = symbol.trim();
    for (const branch of this.branches) {
      // Exact match
      if (symbol && symbol === branch.symbol) {
        return branch.behavior;
      }

      // Not match
      else if (branch.symbol.includes("not ")) {
        // Get last character of branch.symbol
        const notSymbol = branch.symbol.slice(-1);

        if (symbol && symbol !== notSymbol) {
          return branch.behavior;
        }
      }

      // Any
      else if (symbol && branch.symbol === "Any") {
        return branch.behavior;
      }

      // None
      else if (!symbol && branch.symbol === "None") {
        return branch.behavior;
      }
    }
  }
}
