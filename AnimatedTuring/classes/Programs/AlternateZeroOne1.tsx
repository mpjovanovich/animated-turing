import { ConfigMap, Operation } from "../ConfigMap";

// p81
export namespace AlternateZeroOne1 {
  const b = new ConfigMap("b");
  const c = new ConfigMap("c");
  const e = new ConfigMap("e");
  const f = new ConfigMap("f");
  b.addBranch("None", [Operation.PRINT0, Operation.RIGHT], c);
  c.addBranch("None", [Operation.RIGHT], e);
  e.addBranch("None", [Operation.PRINT1, Operation.RIGHT], f);
  f.addBranch("None", [Operation.RIGHT], b);

  // This is the initial configuration
  export const program = b;
}
