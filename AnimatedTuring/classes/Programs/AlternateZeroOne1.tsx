import { configMap, Operation } from "../Program";

// p81
export namespace AlternateZeroOne1 {
  const b = new configMap("b");
  const c = new configMap("c");
  const e = new configMap("e");
  const f = new configMap("f");
  b.addBranch("None", [Operation.PRINT0, Operation.RIGHT], c);
  c.addBranch("None", [Operation.RIGHT], e);
  e.addBranch("None", [Operation.PRINT1, Operation.RIGHT], f);
  f.addBranch("None", [Operation.RIGHT], b);

  // This is the initial configuration
  export const program = b;
}
