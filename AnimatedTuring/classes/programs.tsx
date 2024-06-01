/* ****************************************************************
 * "Programs" contain the following:
 * - Initial configuration (this is the current program).
 * - Mapping of symbols to actions, where actions are in the form of:
 *   - Set of operations
 *   - Final m-config (which is another "program")
 *
 * The programming structure looks like this:
 * "symbol": [{operations}, "final m-config"]
 * - "symbol" is a string
 * - {operations} is an array of operations
 *
 * An example looks something like this:
 * {
 *   None: [{P0}, "b"]
 *   0: [{R, R, P1}, "b"]
 *   1: [{R, R, P0}, "b"]
 * }
 *
 * Per Turing, symbol resolution strings shall be encoded in the form:
 * - "s" = "symbol", the exact symbol
 * - "!s" = "not symbol", any symbol other than "symbol"
 * - "" = "None", an empty square
 * , where "s" is some symbol.
 *
 * In this case, "b" is not a string but another instance of a program class.
 * **************************************************************** */

import { Operation } from "./TuringMachine";

class Program {
  constructor() {}
}
