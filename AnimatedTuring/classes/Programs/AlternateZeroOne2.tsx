import { configMap, Operation } from "../Program";

// p84
export namespace AlternateZeroOne2 {
  const b = new configMap("b");
  b.addBranch("None", [Operation.PRINT0], b);
  b.addBranch("0", [Operation.RIGHT, Operation.RIGHT, Operation.PRINT1], b);
  b.addBranch("1", [Operation.RIGHT, Operation.RIGHT, Operation.PRINT0], b);

  // This is the initial configuration
  export const program = b;
}
