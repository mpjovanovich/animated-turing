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
import { Behavior } from "./Behavior";
import { Branch } from "./Branch";
import { Operation } from "./Operation";

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
    for (const branch of this.branches) {
      // Any
      if (branch.symbol === "Any" && symbol) {
        return branch.behavior;
      }

      // None
      else if (branch.symbol === "None" && !symbol) {
        return branch.behavior;
      }

      // Exact match
      else if (branch.symbol === symbol) {
        return branch.behavior;
      }

      // Not match
      else if (
        branch.symbol === "not " + symbol &&
        symbol &&
        symbol !== branch.symbol
      ) {
        return branch.behavior;
      }
    }
  }
}