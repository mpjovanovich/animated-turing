import { mFunction, Operation } from "../Program";

// Each program is wrapped in a namespace to avoid naming conflicts.
export namespace AlternateZeroOne1 {
  // p81
  const b = new mFunction("b");
  const c = new mFunction("c");
  const e = new mFunction("e");
  const k = new mFunction("k");
  b.addBranch("None", [Operation.PRINT0, Operation.RIGHT], c);
  c.addBranch("None", [Operation.RIGHT], e);
  e.addBranch("None", [Operation.PRINT1, Operation.RIGHT], k);
  k.addBranch("None", [Operation.RIGHT], b);

  // This is the initial configuration
  export const program = b;
}
