import { mFunction, Operation } from "../Program";

// Each program is wrapped in a namespace to avoid naming conflicts.
export namespace AlternateZeroOne2 {
  // p84
  const b = new mFunction();
  b.addBranch("None", [Operation.PRINT0], b);
  b.addBranch("0", [Operation.RIGHT, Operation.RIGHT, Operation.PRINT1], b);
  b.addBranch("1", [Operation.RIGHT, Operation.RIGHT, Operation.PRINT0], b);

  // This is the initial configuration
  export const program = b;
}
