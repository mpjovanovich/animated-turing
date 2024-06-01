import { configMap, Operation } from "../Program";

// This m-function expands into a "regular" set of configmaps, which it returns as an array.
// p116
function findSymbol(q: configMap, r: configMap, x: string): configMap[] {
  const f = new configMap("f");
  const f1 = new configMap("f1");
  const f2 = new configMap("f2");

  f.addBranch("ə", [Operation.LEFT], f1);
  f.addBranch("not ə", [Operation.LEFT], f);

  f1.addBranch(x, [], q);
  f1.addBranch("not " + x, [Operation.RIGHT], f1);
  f1.addBranch("None", [Operation.RIGHT], f2);

  f2.addBranch(x, [], q);
  f2.addBranch("not " + x, [Operation.RIGHT], f1);
  f2.addBranch("None", [Operation.RIGHT], r);

  return [f, f1, f2];
}
