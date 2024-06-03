import { ConfigMap, Operation } from "../ConfigMap";
import { findSymbol } from "../Functions/FindSymbol";

// p84
export namespace TestFindSymbol {
  const b = new ConfigMap("b");
  const c = new ConfigMap("found");
  const d = new ConfigMap("not found");

  const find0 = findSymbol();
  find0.args.C.ConfigMap = c; // If found go to this configMap
  find0.args.B.ConfigMap = d; // If not found go to this configMap
  find0.args.a.string = "0"; // Try to find this symbol
  find0.setConfigMaps();

  b.addBranch("None", [Operation.PRINT0], b);
  b.addBranch("0", [Operation.RIGHT, Operation.RIGHT, Operation.PRINT1], b);
  b.addBranch(
    "1",
    [Operation.RIGHT, Operation.RIGHT, Operation.PRINT0],
    find0.initialConfig
  );
  c.addBranch("None", [], c); // Terminal
  d.addBranch("None", [], d); // Terminal

  // This is the initial configuration
  export const program = b;
}
